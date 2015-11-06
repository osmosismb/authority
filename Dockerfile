FROM centos:centos7

# Install base dependencies
RUN yum install -y epel-release httpd

# Install PHP dependencies
RUN yum install -y php php-mysql

# Add application files
COPY httpdocs /var/www/html/

COPY scripts/httpd.conf /etc/httpd/conf/httpd.conf

EXPOSE 8080
CMD ["-D", "FOREGROUND"]
ENTRYPOINT ["/usr/sbin/httpd"]
