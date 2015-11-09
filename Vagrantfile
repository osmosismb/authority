# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 80, host: 8080

  config.vm.provision "shell", inline: <<-SHELL
    echo "export APPLICATION_ENV=dev" >> ~/.profile
  SHELL

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "ansible/vagrant.yml"
  end
end
