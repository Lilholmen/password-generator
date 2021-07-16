const LOLETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPLETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SPECIAL = '!?@#$%^&*()_-=+,.<>\\/[]{}"|\'';
const ALLPARAMETERS = [LOLETTERS, UPLETTERS, NUMBERS, SPECIAL];
const parametersMask = [true, false, true, false];

const counter = document.querySelector('.length__counter');
const buttonCounterAll = document.querySelectorAll('.length__button');
let passwordLength = counter.value;

const buttonParameterAll = document.querySelectorAll('.password__parameter');
const buttonGenerate = document.querySelector('#generate');
const buttonCopy = document.querySelector('#copy');
const passwordOutput = document.querySelector('.output-section__result');

addParameterText(ALLPARAMETERS);

buttonCounterAll.forEach((item) => {
  item.addEventListener('click', (event) => {
    const styles = event.currentTarget.classList;

    if (styles.contains('decrease') && passwordLength > 3) {
      passwordLength--;
    } else if (styles.contains('increase') && passwordLength < 99) {
      passwordLength++;
    }

    counter.value = passwordLength;

    passwordOutput.textContent = generatePassword(
      applyParametrs(ALLPARAMETERS, parametersMask),
      passwordLength
    );
  });
});

counter.addEventListener('input', userCounterInput);
counter.addEventListener('focusout', () => {
  counter.value = passwordLength;
});

buttonParameterAll.forEach((parameter) => {
  parameter.addEventListener('click', () => {
    const nodeClassList = parameter.classList;

    if (nodeClassList.value.includes('password__parameter--off')) {
      nodeClassList.remove('password__parameter--off');
      nodeClassList.add('password__parameter--on');

      parametersMask[parameter.id - 1] = true;
    } else {
      nodeClassList.remove('password__parameter--on');
      nodeClassList.add('password__parameter--off');

      parametersMask[parameter.id - 1] = false;
    }

    if (!parametersMask.find((item) => item === true)) {
      parametersMask[0] = true;

      const firstParameter = document.querySelector(
        '.password__parameter'
      ).classList;
      firstParameter.remove('password__parameter--off');
      firstParameter.add('password__parameter--on');
    }

    passwordOutput.textContent = generatePassword(
      applyParametrs(ALLPARAMETERS, parametersMask),
      passwordLength
    );
  });
});

buttonGenerate.addEventListener('click', () => {
  passwordOutput.textContent = generatePassword(
    applyParametrs(ALLPARAMETERS, parametersMask),
    passwordLength
  );
});

buttonCopy.addEventListener('click', () => {
  //document.execCommand('copy');
});

passwordOutput.textContent = generatePassword(
  applyParametrs(ALLPARAMETERS, parametersMask),
  passwordLength
);

function addParameterText(text) {
  const parameterText = document.querySelectorAll('.parameter__body');

  parameterText.forEach((item, index) => {
    item.textContent = text[index];
  });
}

function generatePassword(parameters, passwordLength) {
  const paramLength = parameters.length;
  let password = '';

  for (let i = 0; i < passwordLength; i++) {
    password += parameters[randomInt(paramLength - 1)];
  }

  return password;
}

function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function applyParametrs(all, mask) {
  const applied = mask.map((item, index) => {
    if (item) return all[index];
  });

  return applied.join('');
}

function userCounterInput(event) {
  const inputValue = +event.target.value;

  if (isNaN(inputValue)) {
    return;
  } else if (inputValue < 3) {
    passwordLength = 3;
  } else if (inputValue > 99) {
    passwordLength = 99;
  } else {
    passwordLength = inputValue;
  }

  passwordOutput.textContent = generatePassword(
    applyParametrs(ALLPARAMETERS, parametersMask),
    passwordLength
  );
}
