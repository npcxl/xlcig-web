# xlcig.cn 域名DNS配置指南

## 🌐 DNS解析配置

### 1. 在域名服务商控制台配置以下记录：

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | @ | 您的服务器IP | 600 |
| A | www | 您的服务器IP | 600 |
| CNAME | api | xlcig.cn | 600 |

### 2. 示例配置（假设服务器IP为：123.456.789.0）

```
类型    主机记录    记录值           TTL
A       @          123.456.789.0    600
A       www        123.456.789.0    600
CNAME   api        xlcig.cn         600
```

### 3. 验证DNS解析

配置完成后，可以使用以下命令验证：

```bash
# 检查主域名解析
nslookup xlcig.cn

# 检查www子域名解析
nslookup www.xlcig.cn

# 检查API子域名解析
nslookup api.xlcig.cn
```

### 4. 常见域名服务商配置方法

#### 阿里云（万网）
1. 登录阿里云控制台
2. 进入域名解析 > DNS解析
3. 添加记录，按上表配置

#### 腾讯云DNSPod
1. 登录腾讯云控制台
2. 进入域名服务 > 我的域名
3. 点击解析，添加记录

#### Cloudflare
1. 登录Cloudflare控制台
2. 选择域名，进入DNS设置
3. 添加记录，建议开启CDN代理

#### GoDaddy
1. 登录GoDaddy账户
2. 进入DNS管理
3. 修改或添加A记录和CNAME记录

### 5. DNS传播时间

- **国内DNS**：通常1-2小时生效
- **国际DNS**：可能需要24-48小时完全传播
- **CDN网络**：如使用Cloudflare等，可能需要额外时间

### 6. 高级配置（可选）

#### 添加邮件记录（如需要）
```
类型    主机记录    记录值                   优先级
MX      @          mail.xlcig.cn           10
A       mail       123.456.789.0           -
```

#### 添加TXT记录（用于验证）
```
类型    主机记录    记录值
TXT     @          "v=spf1 include:_spf.example.com ~all"
```

### 7. 安全建议

1. **启用DNSSEC**（如果服务商支持）
2. **使用CDN服务**（如Cloudflare）提升访问速度
3. **定期检查解析记录**，防止被恶意修改
4. **备份DNS配置**，以防意外更改

### 8. 故障排除

如果域名无法访问，请检查：

1. **DNS解析是否正确**
   ```bash
   dig xlcig.cn
   dig www.xlcig.cn
   ```

2. **服务器防火墙设置**
   ```bash
   ufw status
   ```

3. **Nginx服务状态**
   ```bash
   systemctl status nginx
   ```

4. **SSL证书状态**
   ```bash
   certbot certificates
   ```

### 9. 联系信息

如遇到问题，可以：
- 检查服务器日志：`tail -f /var/log/nginx/error.log`
- 查看PM2进程：`pm2 list`
- 测试API连接：`curl https://xlcig.cn:9999/health` 