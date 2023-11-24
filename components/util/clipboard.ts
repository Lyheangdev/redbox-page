/**
 *
 * @param url :👉 url of being likely to be made to clipboard
 */
export const copyToClipboard = (url: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url);
  } else {
    const input = document.createElement("textarea");
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy"); //* Exception
    document.body.removeChild(input);
  }
};
