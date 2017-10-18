# -*- coding: utf-8 -*-
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import View
import re
from django.core.urlresolvers import reverse
from users.models import User
from django import db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from django.conf import settings
from itsdangerous import SignatureExpired
from celery_tasks.tasks import send_active_email
from django.contrib.auth import authenticate, login

# Create your views here.


# def register(request):
#     """注册"""
#     # 使用get方式访问 获取页面
#     if request.method == "GET":
#         return render(request, "register.html")
#     else:
#         # post请求方式
#         return HttpResponse("post请求方式")

class RegisterView(View):
    """注册"""
    def get(self, request):
        """对应get请求方式，提供注册页面"""
        return render(request, "register.html", )

    def post(self, request):
        """对应post请求方式，接收处理用户的注册数据"""
        # 接收传入的参数
        user_name = request.POST.get("user_name")
        password = request.POST.get("pwd")
        email = request.POST.get("email")
        allow = request.POST.get("allow")

        # 检验参数的正确性
        if not all([user_name, password, email]):
            # 重定向到注册页面
            return redirect(reverse("users:register"))

        if not re.match(r"^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$", email):
            # 返回错误信息
            return render(request, "register.html", {"errmsg": "邮箱格式不正确"})

        if allow != "on":
            return render(request, "register.html", {"errmsg": "请接收注册协议！"})

        # 进行业务逻辑处理，将数据保存到数据库
        # 注意用户的密码要加密，
        try:
            # django的AbstractUser基类提供的创建用户的方法
            user = User.objects.create_user(user_name, email, password)
        except db.IntegrityError:
            # 如果用户名已存在，则抛出此异常信息
            return render(request, "register.html", {"errmsg": "用户名已存在！"})

        # 将用户的激活状态设置为假
        user.is_active = False
        user.save()

        # 为用户生成激活口令
        token = user.generate_active_token()

        # 使用celery异步发送邮件
        send_active_email.delay(user_name, email, token)

        # 将结果返回给前端
        return redirect(reverse("goods:index"))


class ActiveView(View):
    """激活"""
    def get(self, request, token):
        """

        :param request:
        :param token: token是用户携带的口令，唯一标识用户
        :return:
        """
        # 解析口令token，获取用户身份
        # 构建序列化器
        s = Serializer(settings.SECRET_KEY)
        try:
            data = s.loads(token)
        except SignatureExpired:
            # 表示token过期
            return HttpResponse("链接已过期！")
        # 表示token未过期，
        user_id = data.get("confirm")

        # 查询用户的数据
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            # 用户不存在
            return HttpResponse("用户不存在！")
        # 设置用户的激活状态
        user.is_active = True
        user.save()

        # 返回处理结果
        # return HttpResponse("进入到登录页面")
        return redirect(reverse("users:login"))


class LoginView(View):
    """登录"""
    def get(self, request):
        """提供登录页面"""
        return render(request, "login.html")

    def post(self, request):
        """处理登录的数据"""
        # 获取参数
        user_name = request.POST.get("username")
        password = request.POST.get("pwd")

        # 参数校验
        if not all([user_name, password]):
            # 参数不完整
            return render(request, "login.html")

        # 登录业务逻辑处理
        # try:
        #     password = sha256(password)
        #     User.objects.get(username=user_name, password=password)
        # except User.DoesNotExist:
        #     return HttpResponse("用户名或密码错误")

        # 使用django的认证系统进行用户密码的校验
        user = authenticate(username=user_name, password=password)
        if user is None:
            # 用户的登录信息有误
            return render(request, "login.html", {"errmsg": "用户名或密码错误！"})

        # 判断用户的激活状态
        if user.is_active is False:
            return render(request, "login.html", {"errmsg": "用户尚未激活！"})

        # 保存用户的登录状态
        # 使用django的login函数保存用户的session数据
        login(request, user)

        # 登录成功，跳转到主页
        return redirect(reverse("goods:index"))

def send(request):
    return render(request,'index.html')









