<script>
    export let quote, i
</script>

<div
class="card quote p-3 m-12 shadow-lg border border-2 border-gray-800 rounded-sm bg-gradient-to-br from-transparent via-gray-900  rounded-xl"
>
<div class="badge bg-gray-700">{i + 1}</div>
<label class="input-group input-group-xs rounded-none">
    <span class="bg-slate-900 rounded-none">Original</span>
    <span
        class="rounded-none badge badge-warning input-xs bg-slate-900 text-sky-500 input-xs"
        >{quote.originalText}</span
    >
</label>
<h1 class="quote-body p-8 text-2xl">
    <span class="quote-mark text-sky-300">&ldquo;</span>{@html quote.quoteBody}<span
        class="quote-mark text-sky-300">&rdquo;</span
    >
    <span class="quote-author text-sky-300">~ {quote.author.name ? quote.author.name : quote.author}</span>
</h1>
<div class="flex flex-col justify-items-start place-items-start">
    <!-- <h1 class="badge badge-xl badge-success">{quote.author}</h1> -->
    <label class="input-group input-group-xs">
        <span class="bg-slate-900">Author</span>
        <span class="badge badge-success bg-slate-900 text-sky-300 input-xs"
            >{quote.author.name ? quote.author.name : quote.author}</span
        >
    </label>
    {#if quote.title}
        <label class="input-group input-group-xs">
            <span class="bg-slate-900">Title</span>
            <span class="badge badge-success bg-slate-900 text-sky-400 input-xs"
                >{quote.title}</span
            >
        </label>
    {/if}
    {#if quote.authorTitle && quote.authorTitle.length}
        <label class="input-group input-group-xs">
            <span class="bg-slate-900">AuthorTitle</span>
                 <!-- {#each quote.authorTitle as title}  -->
                    <span
                        class="font-sans text-sm bg-black rounded-sm mx-1 text-fuchsia-400 input-xs"
                        >{quote.authorTitle}</span
                    >
                 <!-- {/each}  -->

        </label>
    {/if}
    {#if quote.date}
        <label class="input-group input-group-xs rounded-none">
            <span class="bg-slate-900 rounded-none">Date</span>
            <span class="rounded-none badge badge-info bg-slate-900 text-gray-400 input-xs"
                >{quote.date}</span
            >
        </label>
    {/if}
    {#if quote.source}
        <label class="input-group input-group-xs rounded-none">
            <span class="bg-slate-900 rounded-none">Source</span>
            <span
                class="rounded-none badge badge-warning input-xs bg-slate-900 text-sky-500 input-xs"
                >{quote.source}</span
            >
        </label>
    {/if}
    {#if quote.tags?.length}
        <label class="input-group input-group-xs rounded-none">
            <span class="bg-slate-900 rounded-none">Tags</span>
            {#each quote.tags as tag}
                <span
                    class="rounded-none badge badge-warning input-xs bg-slate-600 mx-1 text-sky-500 input-xs"
                    >{tag}</span
                >
            {/each}
        </label>
    {/if}
    {#if quote.context}
        <label class="input-group input-group-xs rounded-none">
            <span class="bg-slate-900 rounded-none">Context</span>
            <span
                class="rounded-none badge badge-warning input-xs bg-slate-900 text-sky-500 input-xs"
                >{quote.context}</span
            >
        </label>
    {/if}
    <!-- {#if quote.details?.length}
        DETAILS
        {#each quote.details as detail}
            {#if detail.type !== 'undefined'}
                <label class="input-group input-group-xs rounded-none">
                    <span class="bg-slate-900 rounded-none">{detail.type}</span>
                    <span class="rounded-none badge badge-info input-xs">{detail.value}</span>
                </label>
            {/if}
        {/each}
    {/if}
    {#if quote.remainingText?.length}
        <label class="input-group input-group-xs rounded-none">
            <span class="bg-slate-900 rounded-none">remainingText: </span>
            <span class="rounded-none badge badge-info input-xs">{quote.remainingText}</span>
        </label>
    {/if} -->
</div>
</div>