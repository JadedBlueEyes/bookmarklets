// ==Bookmarklet==
// @name Decode classified information on the SCP Wiki
// ==/Bookmarklet==
/**
 * Create a deep copy of a DOM node and apply transformations to its text content
 **/
function createTransformedNode(windowContext) {
  function cloneAndTransformNode(node, transformText) {
    let newNode
    if (node.nodeType === Node.TEXT_NODE) {
      newNode = document.createTextNode(transformText(node.nodeValue))
    } else {
      if (node.nodeType === Node.ELEMENT_NODE) {
        newNode = document.createElement(node.tagName)
        for (let e = 0; e < node.attributes.length; e++) {
          const attribute = node.attributes[e]
          newNode.setAttribute(attribute.name, attribute.value)
        }
        for (let e = 0; e < node.childNodes.length; e++) {
          const childNode = node.childNodes[e]
          newNode.appendChild(cloneAndTransformNode(childNode, transformText))
        }
      } else {
        newNode = node.cloneNode(true)
      }
    }
    return newNode
  }
  const document = windowContext.document,
    Node = windowContext.Node
  return cloneAndTransformNode
}
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const keyPattern = 'owtnsfvlnqyfzbdercgqiuapucjekhamblshwoxpgzyrttxkmi';

function performSubstitution(decrypting, inputString) {
  function substituteChar(char, keyChar) {

    const charIndex = alphabet.indexOf(char);
    const keyIndex = alphabet.indexOf(keyChar);
    return (
      (char = charIndex),
      (keyChar = keyIndex),
      alphabet.charAt(
        (char + (decrypting ? alphabet.length - keyChar : keyChar)) %
        alphabet.length
      )
    )
  }
  return inputString
    .split('')
    .map(function (char, index) {
      index = keyPattern.charAt(
        index % keyPattern.length
      )
      return -1 !== 'abcdefghijklmnopqrstuvwxyz'.indexOf(char)
        ? substituteChar(char, index)
        : -1 !== 'abcdefghijklmnopqrstuvwxyz'.indexOf(char.toLowerCase())
          ? substituteChar(char.toLowerCase(), index).toUpperCase()
          : char
    })
    .join('')
}
let cipher = {
  encrypt: function (text) {
    return performSubstitution(false, encodeURIComponent(text));
  },
  decrypt: function (text) {
    return decodeURIComponent(performSubstitution(true, text));
  }
};

const transformNode = createTransformedNode(window);
const e = document.querySelector('.classified-info')
e.style.display = 'block';
e.parentNode.replaceChild(transformNode(e, cipher.decrypt), e);
