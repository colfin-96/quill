// import Delta from 'quill-delta';

// const quill = new Quill('#editor', {
//     modules: {
//       toolbar: [
//         [{ header: [1, 2, false] }],
//         ['bold', 'italic', 'underline'],
//         ['image', 'code-block'],
//       ],
//     },
//     placeholder: 'Compose an epic...',
//     theme: 'snow', // or 'bubble'
//   });

const createContents = (separator) =>
  new Array(200)
    .fill(0)
    .map((_, i) => `text ${i + 1}`)
    .join(separator);

const container = document.body.appendChild(document.createElement('div'));

Object.assign(container.style, {
  width: '200px',
  display: 'flex',
  overflow: 'scroll',
});

const space = container.appendChild(document.createElement('div'));
space.style.width = '80px';

const editorContainer = container.appendChild(document.createElement('div'));
Object.assign(editorContainer.style, {
  width: '100px',
  overflow: 'scroll',
  border: '10px solid red',
});

const quill = new Quill(editorContainer);

Object.assign(quill.root.style, {
  overflow: 'scroll',
  whiteSpace: 'nowrap',
});

const text = createContents(' ');
const text100Index = text.indexOf('text 100');
const Delta = Quill.import('delta');
const delta = new Delta()
  .insert(text)
  .compose(new Delta().retain(text100Index).retain(8, { bold: true }));
quill.setContents(delta);
quill.setSelection({ index: text100Index, length: 8 }, 'user');
