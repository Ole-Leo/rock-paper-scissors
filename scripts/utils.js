async function getResponse(params) {
  try {
    const res = await fetch(baseURL + params);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function templateEngine(node) {
  if (node === undefined || node === null || node === false) {
    return document.createTextNode('');
  }

  if (typeof node === 'string' || typeof node === 'number' || node === true) {
    return document.createTextNode(node);
  }

  const unit = document.createElement(node.tag);

  if (Array.isArray(node)) {
    const snippet = document.createDocumentFragment();

    node.forEach(item => {
      snippet.appendChild(templateEngine(item));
    });
    return snippet;
  }

  if (node.cls) {
    const classes = [].concat(node.cls);

    classes.forEach(cls => {
      unit.classList.add(cls);
    });
  }

  if (node.attrs) {
    const keys = Object.keys(node.attrs);

    keys.forEach(key => {
      unit.setAttribute(key, node.attrs[key]);
    });
  }

  unit.appendChild(templateEngine(node.content));

  return unit;
}

function setPageLayout(element) {
  app.textContent = '';

  const container = document.createElement('div');
  container.classList.add('container');

  container.appendChild(element);
  app.appendChild(container);
}
