<script>
	import { onMount, onDestroy } from 'svelte';
	import loader from '@monaco-editor/loader';

	let { value = $bindable(), language = 'javscript', theme = 'vs-dark' } = $props();
	let editor = $state();
	let monaco = $state();
	let editorContainer = $state();

	onMount(async () => {
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

		editor.onDidChangeModelContent(() => {
			value = editor.getValue();
			//console.log('new value is ', value);
		});
	});

	$effect(() => {
		if (editor) {
			const model = editor.getModel();
			monaco?.editor.setModelLanguage(
				model,
				language.toLowerCase() === 'c++' ? 'cpp' : language.toLowerCase()
			);
			editor.updateOptions({ theme });
		}
	});

	$effect(() => {
		if (editor && value !== editor.getValue()) {
			editor.setValue(value);
		}
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

<div bind:this={editorContainer} class="h-full w-full" />
