<script>
    	import McMailingList from '$components/MCMailingList.svelte';
        import MetabrainCanvas2 from '$components/MetabrainCanvas2.svelte';
    	import { onMount } from 'svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

<div class="flex flex-col w-full h-full align-center justify-center text-center font-newsreader ">
    <h1
        class="relative z-10 text-5xl mt-[12rem] md:text-[3rem] lg:text-[7rem] xl:text-[10rem] font-display  "
    >
        MetaBrain
    </h1>
    <h2 class=" text-2xl z-10 text-2xl  md:text-2xl lg:text-4xl xl:text-6xl  text-winterblues-200">An Operating System For Life.</h2>
    <div
        class="flex relative z-10 flex-col relative py-8 my-4 w-auto mx-8 rounded-lg p-0 mx-6 md:p-8 md:mx-12 text-lg  md:text-xl lg:text-2xl xl:text-3xl font-extralight"
    >
        <p class="leading-7 text-winterblues-200 pb-12 font-extralight">
            Uniting planning, learning, execution, & tracking across all domains of life.
            <br /><br />Helping you to learn more, do more, & achieve more.<br /><br />
            Be better in every way.
        </p>
        <!-- Begin Mailchimp Signup Form -->
        <div class="w-full flex align-center justify-center mt-8">
            <!-- <div id="mc_embed_signup" class="w-1/2 py-6 border-t-2 border-b-2 border-sky-50"> -->
            <McMailingList />
        </div>
    </div>
    <div class="absolute z-0 w-screen h-screen top-0 left-0 ">
        <!-- <MetabrainCanvas {mounted} /> -->
        <MetabrainCanvas2 {mounted} />
        <!-- <MetabrainCanvas3 {mounted} /> -->
    </div>
</div>
<!-- </main> -->


<style lang="scss">
.statement {
    line-height: 1.25em;
    background: linear-gradient(black, black) padding-box,
        linear-gradient(
                120deg,
                var(--color-emerald-500) 10%,
                var(--color-amber-500) 25%,
                var(--color-rose-500) 50%,
                var(--color-fuchsia-500) 75%,
                var(--color-winterblues-400) 90%
            )
            border-box;
    border-radius: 1rem;
    border: 3px solid transparent;
    // box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.25);
    .author {
        color: var(--color-gray-300);
    }
}

</style>
