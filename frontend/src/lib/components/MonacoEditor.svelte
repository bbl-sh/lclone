<script>
	// This Code is old, should have to change this to latest svelte 5 with runes support, ignore the warnings
	import { onMount, onDestroy } from 'svelte';
	import loader from '@monaco-editor/loader';

	export let value = '';
	export let language = 'javascript';
	export let theme = 'vs-dark';

	let editor;
	let monaco;
	let editorContainer;

	onMount(async () => {
		// Configure local Monaco instance
		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });

		monaco = await loader.init();

		editor = monaco.editor.create(editorContainer, {
			value,
			language,
			theme,
			automaticLayout: true,
			minimap: { enabled: false },
			scrollBeyondLastLine: false,
			fontSize: 14,
			lineNumbers: 'on'
		});

		// Two-way binding
		editor.onDidChangeModelContent(() => {
			value = editor.getValue();
		});
	});

	// Reactive updates for language and theme
	$: if (editor) {
		const model = editor.getModel();
		monaco?.editor.setModelLanguage(
			model,
			language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()
		);
		editor.updateOptions({ theme });
	}

	$: if (editor && value !== editor.getValue()) {
		editor.setValue(value);
	}

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div bind:this={editorContainer} class="h-full w-full" />
