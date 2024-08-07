export const themeScript = `
  (function() {
    try {
      var savedTheme = localStorage.getItem('themeColor');
      if (savedTheme) {
        document.documentElement.classList.add(savedTheme);
      } else {
        document.documentElement.classList.add('drac-pro-cyan');
      }
    } catch (e) {
      console.error('Error setting theme from localStorage:', e);
    }
  })();
`