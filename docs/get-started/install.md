---
id: install
title: Installation
---

# Install Towhee with conda
   1. create a conda environment for Towhee:

   ```console
   conda create -n towhee_env python=3.6
   ```

   2. activate conda environment:
   ```console
   conda activate towhee_env
   ```

   3. install towhee using the following line:
   ```console
   conda install towhee
   ```

# Install Towhee with pip
   install towhee using the following line:
   ```console
   pip install towhee
   ```

# Install Towhee from source code
   1. First, if using a venv, activate it before moving ahead. (If you want to install Towhee directly into your environment, skip this step.)

   * Decide on a location to install the virtual enviroment. This location will contain all the files for the virtual enviroment and the venv will be activated from this location.

   For a POSIX system:
   ```console
   python3 -m venv /path/to/venv
   ```

   For a Windows system:
   ```console
   c:\>c:\Python35\python -m venv c:\path\to\venv
   ```

   * Start the virtual environment using the command corresponds to your system:

   | Platform | Shell | Command to activate virtual environment |
   |---|---|---|
   | Posix | bash/zsh | $ source <path/to/venv>/bin/activate |
   | | fish | $ source <path/to/venv>/bin/activate.fish |
   | | csh/tcsh | $ source <path/to/venv>/bin/activate.csh |
   | | PowerShell Core | $ <path/to/venv>/bin/Activate.ps1 |
   | Windows | cmd.exe | C:\> <path\to\venv>\Scripts\activate.bat |
   | | PowerShell | PS C:\> <path\to\venv>\Scripts\Activate.ps1 |

   2. If not already present, install git on your system. See https://github.com/git-guides/install-git for more details.

   3. Next, clone the towhee repository:
   ```console
   git clone https://github.com/towhee-io/towhee.git
   ```

   4. After the download is done, proceed into the towhee directory and run the following command:
   ```console
   python setup.py install
   ```