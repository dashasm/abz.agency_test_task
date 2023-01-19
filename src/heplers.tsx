export const validation = (e: React.FocusEvent<HTMLInputElement, Element>) => {
  const value = e.target.value;

  switch (e.target.name) {
    case "name":
      return value.length >= 2 && value.length <= 60;
    case "email":
      let regex = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
      );

      return value.length >= 2 && value.length <= 100 && value.match(regex);
    case "phone":
      let regexPhone = new RegExp("[+]{0,1}380([0-9]{9})");

      return value.length === 13 && value.match(regexPhone);
  }
};
