# Smart Break for [Quill WYSIWYG Editor](https://quilljs.com/)
[![npm version](https://badge.fury.io/js/quill-smart-break.svg)](https://badge.fury.io/js/quill-smart-break)
![License](https://img.shields.io/npm/l/quill-smart-break)

## Contributions
 * [@farnabaz](https://github.com/farnabaz) for the initial solution
 * [@mackermedia](https://github.com/mackermedia) for the optimizations
 
## Quickstart

Load the module after Quill
```html
<!-- Include Quill stylesheet -->
<link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">

<!-- Create the toolbar container -->
<div id="toolbar">
  <button class="ql-bold">Bold</button>
  <button class="ql-italic">Italic</button>
</div>

<!-- Create the editor container -->
<div id="editor">
  <p>Hello World!</p>
</div>

<!-- Include the Quill library -->
<script src="https://cdn.quilljs.com/1.0.0/quill.js"></script>
<script src="/dist/smart-breaker.min.js"></script>

<!-- Initialize Quill editor -->
<script>
  Quill.register('modules/smart-breaker', SmartBreaker);

  var editor = new Quill('#editor', {
    modules: { toolbar: '#toolbar', 'smart-breaker': true },
    theme: 'snow'
  });
</script>
```

## License

**quill-smart-break** is released under MIT license. See bundled [LICENSE](LICENSE) for details.