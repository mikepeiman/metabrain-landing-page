<script>
	// import Time from 'svelte-time';
	import MetabrainCanvas from '$components/MetabrainCanvas.svelte';
	import { onMount } from 'svelte';
	let mounted = false;
	onMount(() => {
		mounted = true;
	});

	function GTagFormClick() {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'signup_form_click',
			eventCategory: 'Form',
			eventAction: 'Submit',
			eventLabel: 'Contact Form'
		});
	}


	function GTagFormSubmit() {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			event: 'signup_form_submit',
			eventCategory: 'Form',
			eventAction: 'Submit',
			eventLabel: 'Contact Form'
		});
	}

	import Icon from '@iconify/svelte';
	let email = ""
	const icons = {
		fire1: 'wi:fire',
		fire2: 'vaadin:fire',
		fire3: 'mdi:fire',
		fire4: 'fa:fire',
		fire5: 'fa5:fire',
		fire6: 'fa5:fire-alt',
		fire7: 'el:fire',
		fire8: 'eva:fire',
		arrowCircle1: 'bi:arrow-down-circle-fill',
		arrowCircle2: 'eva:arrow-circle-down-fill',
		arrowCircleLeft2: 'eva:arrow-circle-left-fill',
		home: 'bx:bxs-home-heart',
		x: 'bx:bxs-x-square'
	};
$: email.length > 3 ? fadeMceError() : ""
    $: console.log(`🚀 ~ file: index.svelte ~ line 28 ~ email`, email)

	function fadeMceError() {
		// let mceError = document.getElementById('mce-error-response')
		let mceError = document.querySelectorAll('.mce_inline_error')
        console.log(`🚀 ~ file: index.svelte ~ line 30 ~ fadeMceError ~ mceError`, mceError[1])

        console.log(`🚀 ~ file: index.svelte ~ line 33 ~ fadeMceError ~ email`, email)
		if(email.length > 3){}
		mceError[1].classList.add('fadeOut')
	}
	function checkMCEError() {
		// let mceError = document.getElementById('mce-error-response')
		let mceError = document.querySelectorAll('.mce_inline_error')
        console.log(`🚀 ~ file: index.svelte ~ line 30 ~ fadeMceError ~ mceError`, mceError[1])

        console.log(`🚀 ~ file: index.svelte ~ line 33 ~ fadeMceError ~ email`, email)
		if(email.length < 4){
			mceError[1].classList.remove('fadeOut')
		}
	}
</script>


{#if mounted}
  <!-- <div class="flex flex-col w-screen min-h-screen relative align-center justify-center"> -->
    <div class="flex flex-col z-10 w-full h-full align-center justify-center text-center bg-black/40 ">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-display mb-4">MetaBrain</h1>
      <div class="flex flex-col py-4 my-4 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto rounded-xl p-4 bg-black/60 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-montserrat">
        <h2 class="p-2">One app to rule them all, one platform to unite them;</h2>
        <h2 class="p-2">One knowledge graph to learn and plan and prosper for a lifetime.</h2>
        
        <!-- Begin Mailchimp Signup Form -->
        <div class="w-full flex align-center justify-center mt-8">
          <div id="mc_embed_signup" class="w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
            <form
              action="https://mikepeiman.us7.list-manage.com/subscribe/post?u=2e0789618f3335c1fdeae5f80&amp;id=4f26dc006f"
              method="post"
              on:submit={GTagFormSubmit}
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate bg-none bg-transparent flex flex-col items-center justify-center w-full"
              target="_blank"
              novalidate
            >
              <h2 class="font-display text-base sm:text-lg md:text-xl lg:text-2xl mb-4 text-winterblues-200">
                Get on the list for updates and early access.
              </h2>
              <div id="mc_embed_signup_scroll" class="statement  flex flex-col sm:flex-row items-center justify-center relative z-50 w-full">
                <div class="mc-field-group flex items-center justify-center relative w-full sm:w-auto mb-4 sm:mb-0">
                  <input
                    type="email"
                    on:click={GTagFormClick}
                    bind:value={email}
                    name="EMAIL"
                    class="z-50 required email rounded bg-transparent focus:border-none focus:outline-none focus:shadow-none focus:ring-0 outline-none border-none text-gray-100 w-full sm:w-auto px-4 py-2"
                    id="mce-EMAIL"
                    placeholder="email address"
                    on:blur="{checkMCEError}"
                  />
                </div>
                <button
                  type="submit"
                  name="subscribe"
                  value="Subscribe"
                  id="mc-embedded-subscribe"
                  class="button text-base sm:text-lg h-10 w-full sm:w-auto px-6 py-2 rounded flex items-center justify-center text-center bg-gray-900 hover:bg-gray-800 text-winterblues-400"
                >
                  Subscribe
                </button>
              </div>
              <div id="mce-responses" class="clear foot transition absolute text-base sm:text-lg mt-4">
                <div
                  class="response h-8 block absolute top-full left-0 w-full text-base sm:text-lg flex items-center"
                  id="mce-error-response"
                  style="opacity:0;"
                />
                <div class="response h-8 relative" id="mce-success-response" style="opacity:0;">
                  <Icon icon={icons.x} class="h-8 w-8 p-0 absolute text-white" />
                </div>
              </div>
              <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
              <div style="position: absolute; left: -5000px;" aria-hidden="true">
                <input
                  type="text"
                  name="b_2e0789618f3335c1fdeae5f80_4f26dc006f"
                  tabindex="-1"
                  value=""
                />
              </div>
            </form>
          </div>
        </div>
        <!-- End Mailchimp Signup Form -->
      </div>
    </div>
    <div id="canvas-wrapper" class="absolute w-full h-full top-0 left-0 bg-black -z-10">
      <MetabrainCanvas />
    </div>
  <!-- </div> -->
{/if}


<style global lang="scss">

	#mce-responses {
		position: absolute;
		display: flex;
		height: auto;
		top: 0;
		left: 0;
		width: 370px;
	}
	#mc_embed_signup div.mce_inline_error {
		background-color: var(--color-rose-400) !important;
		// opacity: 0.5;
		width: 250px;
		font-size: 1.15rem;
		color: var(--color-winterblues-100) !important;
		// color: black !important;
		font-weight: 500 !important;
		top: -53px;
		position: absolute;
		left: -16px;
		text-align: left;
		border-radius: 0;
		height: auto;
		transition: all .25s;
	}
	#mc_embed_signup div#mce-success-response {
		background-color: var(--color-gray-900) !important;
		width: 100%;
		padding: 1rem;
		height: auto;
		font-size: 1rem;
		color: var(--color-winterblues-100) !important;
		// color: black !important;
		font-weight: 500 !important;
		top: -53px;
		position: absolute;
		left: 0;
		text-align: left;
		border-radius: 0;
		&:before {
			content: 'x';
			position: absolute;
			left: 95%;
			top: 0;
			width: 100%;
			height: 100%;
			// background-color: var(--color-gray-900) !important;
			border-radius: 0;
		}
	}
	#mc_embed_signup input.mce_inline_error {
		border-color: var(--color-rose-400) !important;
	}
	.statement {
		// font-family: 'Bad Script', cursive;
		// font-family: 'Coda', cursive;
		// font-family: 'Forum', cursive;
		// font-family: 'Gideon Roman', cursive;
		// font-family: 'Karla', sans-serif;
		// font-family: 'Merriweather', serif;
		font-family: 'Montserrat', sans-serif;
		// font-family: 'Outfit', sans-serif;
		// font-family: 'Overlock', cursive;
		// font-family: 'Staatliches', cursive;
		// font-family: 'Be Vietnam Pro', sans-serif;
		// font-family: 'Montserrat', sans-serif;
		// font-family: 'Nunito', sans-serif;
		// font-family: 'Sarabun', sans-serif;
		// font-family: 'Source Serif 4', sans-serif;
		// font-family: 'Noto Sans Display', sans-serif;
		// font-family: 'Source Sans 3', sans-serif;
		// font-family: 'Karla', sans-serif;
		// font-family: 'Fira Sans', sans-serif;
		// font-family: 'Newsreader', serif;
		// font-family: 'Vollkorn', serif;
		// font-family: 'Merriweather', serif;
		//  font-family: 'Overlock', cursive;
		font-weight: 600;
		// font-weight: 500;
		// font-weight: 700;
		// font-weight: 900;

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
		// linear-gradient(
		// 		120deg,
		// 		rgba(131, 58, 180, 1) 10%,
		// 		rgba(47, 174, 177, 1) 22%,
		// 		rgba(253, 29, 29, 1) 50%,
		// 		rgba(191, 252, 55, 1) 72%,
		// 		rgba(252, 176, 69, 1) 90%
		// 	)
		// 	border-box;
		// linear-gradient(to right, var(--color-winterblues-600), var(--color-deepreds-900)) border-box;
		border-radius: 0.25rem;
		border: 2px solid transparent;
		// box-shadow: 0px 0px 3px 3px rgba(255,255,255,0.25);
		&:focus {
			background-image: linear-gradient(black, black) padding-box,
				linear-gradient(
						120deg,
						var(--color-emerald-500) 10%,
						var(--color-amber-500) 25%,
						var(--color-rose-500) 50%,
						var(--color-fuchsia-500) 75%,
						var(--color-winterblues-400) 90%
					)
					border-box;
		}
	}

	#mc_embed_signup input:-internal-autofill-selected {
		background: rgba(0, 0, 0, 0) !important;
		color: var(--color-winterblues-100) !important;
	}

	.fadeOut {
		opacity: 0;
		transition: all .25s;
	}

	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus {
		-webkit-text-fill-color: var(--color-winterblues-100);
		-webkit-box-shadow: 0 0 0px 1000px #000 inset;
		transition: background-color 5000s ease-in-out 0.2s;
		caret-color: var(--color-winterblues-100);
	}
</style>
