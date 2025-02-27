<script>
	import { EditorView, basicSetup } from 'codemirror';
	import { cpp } from '@codemirror/lang-cpp';
	import Code from '$lib/components/Code.svelte';

	// let editorContainer = 'document.body';
	// let code = `for (int i = 0; i < 1024; i++)\n  cout << elt[i] << "\\n";`;

	// $effect(() => {
	// 	const editorView = new EditorView({
	// 		parent: document.body,
	// 		doc: code,
	// 		extensions: [basicSetup, cpp()]
	// 	});
	// });
</script>

<Code />
<!-- <div class="editor-container" bind:this={editorContainer}></div> -->
