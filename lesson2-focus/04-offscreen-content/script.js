var btn = document.querySelector(".modal-open");
var modalOverlay = document.querySelector(".modal");
// ივენთ ბაბლინგის შესაჩერებლად
var modalDialog = document.querySelector(".modal-dialog");

btn.addEventListener("click", openModal);

var currentlyActivElement;

function openModal() {
  currentlyActivElement = document.activeElement;
  modalDialog.addEventListener("click", noClosing);
  var closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModali);

  var focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  var focusableElements = modalOverlay.querySelectorAll(
    focusableElementsString
  );
  // Convert NodeList to Array
  focusableElements = Array.from(focusableElements);

  var firstFocusElement = focusableElements[0];
  var lastFocusElement = focusableElements[focusableElements.length - 1];

  // console.log(lastFocusElement);

  modalOverlay.style.display = "block";

  firstFocusElement.focus();

  // console.log(focusableElements);

  modalOverlay.addEventListener("keydown", trapTabKey);

  modalOverlay.addEventListener("click", closeModali);

  function trapTabKey(e) {
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusElement) {
          e.preventDefault();
          lastFocusElement.focus();
        }
      } else {
        //if tab
        if (document.activeElement === lastFocusElement) {
          e.preventDefault();
          firstFocusElement.focus();
        }
      }
    }
    if (e.keyCode === 27) {
      closeModali();
    }
  }
}

function closeModali() {
  modalOverlay.style.display = "none";
  currentlyActivElement.focus();
}

function noClosing(e) {
  // ივენთ ბაბლინგის შესაჩერებლად
  e.stopPropagation();
}
