const value = document.querySelector('.length__counter');
const btns = document.querySelectorAll('.length__button');
let count = value.textContent;

btns.forEach((item) => {
  item.addEventListener('click', (event) => {
    const styles = event.currentTarget.classList;

    if (styles.contains('decrease') && count > 3) {
      count--;
    } else if (styles.contains('increase') && count < 999) {
      count++;
    }

    value.style.color = count > 7 ? 'green' : 'red';
    value.textContent = count;
  });
});
