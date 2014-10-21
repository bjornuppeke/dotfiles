# Path to your oh-my-zsh configuration.
ZSH=$HOME/.oh-my-zsh

# Set name of the theme to load.
# Look in ~/.oh-my-zsh/themes/
# Optionally, if you set this to "random", it'll load a random theme each
# time that oh-my-zsh is loaded.
ZSH_THEME="minimal"

# ssh-add all pem files
for pem_file (~/.ssh/*.pem); do
	ssh-add $pem_file > /dev/null 2>&1
done
unset pem_file

# aliases
alias zshconfig="subl ~/.zshrc"
alias ohmyzsh="subl ~/.oh-my-zsh"
alias cdwork="cd ~/Workspace"
alias cdalicecooper="cd ~/workspace/alice-cooper"
alias fstart="forever start"
alias fstop="forever stop"
alias flog="forever logs"
alias flist="forever list"
alias fres="forever restart"
alias fsall="forever stopall"
alias epm="npm --registry http://registry.npmjs.eu/"
alias vpm="npm --registry http://registry.viaplay.tv/"

# Editor
export EDITOR='subl -w'

# Set to this to use case-sensitive completion
# CASE_SENSITIVE="true"

# Uncomment this to disable bi-weekly auto-update checks
# DISABLE_AUTO_UPDATE="true"

# Uncomment to change how often before auto-updates occur? (in days)
# export UPDATE_ZSH_DAYS=13

# Uncomment following line if you want to disable colors in ls
# DISABLE_LS_COLORS="true"

# Uncomment following line if you want to disable autosetting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment following line if you want to disable command autocorrection
DISABLE_CORRECTION="true"

# Uncomment following line if you want red dots to be displayed while waiting for completion
# COMPLETION_WAITING_DOTS="true"

# Uncomment following line if you want to disable marking untracked files under
# VCS as dirty. This makes repository status check for large repositories much,
# much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
plugins=(git)

source $ZSH/oh-my-zsh.sh

# Customize to your needs...
export PATH=/bin:/sbin:/usr/local/bin:/usr/bin:/usr/sbin:/usr/local/sbin:/Users/bjornuppeke/bin:$PATH

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"

### Added by Viaplay Bootstrap
export VIAPLAY_PROJECT_ROOT=/Users/bjornuppeke/Workspace/vc2
source /Users/bjornuppeke/Workspace/bootstrap/config/env.sh
