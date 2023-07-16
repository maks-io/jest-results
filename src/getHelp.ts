export const getHelp = (inclHeader = true) => {
  let help = "";
  if (inclHeader) {
    help += "🃏 jest-results clean-up 🃏\n";
    help +=
      "\njest-results is a tool to capture jest test output and collect it in individual log files\n";
    help +=
      "Please refer to https://github.com/maks-io/jest-results#readme on how to configure it\n";
    help +=
      "\n➡ The current program is used to clean up resulting log files!\n";
  }
  help += "\n";
  help += "Usage:\n";
  help += "jest-results -c <clean_mode> [-d <directory_option>]\n";
  help += "\n";
  help += "Options:\n";
  help += "-h, --help\tDisplay this help info\n";
  help += "-v, --version\tReturn this package's version number\n";
  help += "-c\t\tCLEAN MODE\n";
  help += "  \t\tSelect which kinds of files should be removed.\n";
  help += "  \t\tAccepts one of the following values:\n";
  help += "  \t\t'all', 'stats', 'logs'\n";
  help += "-d\t\tDIRECTORY OPTION (optional)\n";
  help += "  \t\tSelect which directory is going to be clean up recursively.\n";
  help += "  \t\tAccepts one of the following values:\n";
  help += "  \t\t'root', 'current'\n";
  help +=
    "  \t\tWhen using 'root', which is the default, it does not matter what your current working directory is,\n";
  help +=
    "  \t\tit will clean your entire repository. When using 'current' it will clean your current working directory\n";
  help += "  \t\trecursively.\n";
  help += "-i\t\tINVERT DIRECTORY SELECTION (optional)\n";
  help += "  \t\tThis can only be used in combination with `-d current`.\n";
  help +=
    "  \t\tWhen set, it will clean your entire repository except for the current working directory (and children directories).\n";
  help += "\n";
  return help;
};
