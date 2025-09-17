/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					$link
						.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					$link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);


// ============================
// Custom modal popup for research projects
// ============================

$(document).ready(function () {
    // Create modal structure and append to body
    $('body').append(`
        <div id="project-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div id="modal-body"></div>
            </div>
        </div>
    `);

    // Modal CSS (inline for now, could go in main.css instead)
    const modalStyles = `
        .modal {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0; top: 0;
            width: 100%; height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.7);
        }
        .modal-content {
            background: #fff;
            margin: 10% auto;
            padding: 20px;
            border-radius: 8px;
            max-width: 800px;
            text-align: left;
        }
        .modal-close {
            float: right;
            font-size: 24px;
            cursor: pointer;
        }
		#modal-body img {
            max-width: 100%;
            height: auto;
            display: block;
            margin-bottom: 15px;
            border-radius: 4px;
        }
    `;
    $('<style>').text(modalStyles).appendTo('head');

    // Sample project descriptions (match order of your images)
    const projectInfo = {
        "pic01.jpg": `<h3 style="text-align: center;">A Survey of Climate in 
		Adirondack Lake Ecosystems (SCALE)</h3>
		<p style="text-align: justify;">At Cornell, I am using 
		environmental DNA (eDNA) metabarcoding to understand 
		how aquatic communities in the Adirondack Park are changing in 
		response to anthropogenic stressors. As part of this effort, 
		I am also working to expand the genetic resources available 
		for species in New York State. To this end, we are 
		developing molecular tools targeting intraspecific variation 
		as a means to discriminate stocked and naturally occurring 
		brook trout, as well as exploring the feasibility of assessing 
		genetic health of threatened species such as round whitefish 
		using nuclear eDNA.</p>`,
        "pic02.jpg": `<h3 style="text-align: center;">Genome Evolution of 
		Critically Endangered Caribbean Corals</h3>
		<p style="text-align: justify;">During my PhD, my research focused on 
		exploring the genome evolution of Caribbean corals to 
		better understand how the size, structure, and content of their genomes 
		has led to the diversity of corals we observe today. 
		For one study, I was part of a collaborative effort that constructed 
		the first chromosome-scale genome assemblies and genetic maps for 
		two critically endangered Atlantic corals, 
		<em>Acropora palmata</em> and <em>A. cervicornis</em>. 
		By comparing their genomes, 
		we showed that these species maintain a high degree of macrosynteny 
		(their genomes are largely the same in structure), despite millions 
		of years of divergence, and that both have high genome-wide 
		recombination rates, meaning that they both have a strong ability to 
		shuffle their genes during sexual reproduction. In another project, 
		I generated the first high-quality genomes for three additional 
		Caribbean reef-builders — <em>Colpophyllia natans</em>, 
		<em>Dendrogyra cylindrus</em>, and <em>Siderastrea siderea</em>. 
		This work revealed surprising 
		patterns of gene duplications and expansions, especially in 
		<em>S. siderea</em>, which has one of the largest described coral genomes. 
		Together, these studies provide foundational resources for 
		conservation genetics and open the door to investigating how the unique 
		evolutionary history of Caribbean corals may shape their ability to 
		persist in rapidly changing oceans.</p>`,
        "pic03.jpg": `<h3 style="text-align: center;">Genetic Bottlenecks 
		in Coral Restoration</h3>
		<p style="text-align: justify;">In coral restoration, the common 
		assumption is that if you cross equal quantites of eggs and sperm of 
		several parent colonies together, all parents will contribute 
		equally to the offspring—a state called panmixia. In work with SECORE, 
		we tested this assumption using four-parent crosses of 
		<em>Acropora palmata</em> and <em>Colpophyllia natans</em>, 
		raising larvae in both lab cultures and ocean enclosures and 
		sequencing their DNA (Pool-Seq) to track which parents actually 
		contributed over time. What we discovered is that this 
		expectation of equal contributions does not hold: 
		within just days, offspring in lab cultures became dominated 
		by only a couple of parents, even though all were initially 
		compatible. These early shifts mean that ex-situ breeding can 
		create unintended genetic bottlenecks, reducing the 
		diversity that restoration programs are trying to promote. 
		We also found that certain genes were putatively responsible for 
		differential survival in the lab and ocean enclosures. 
		These results highlight that assisted breeding is not a 
		neutral process, and that coral crosses need to be carefully designed 
		and managed to preserve the adaptive potential of 
		restored populations in changing oceans.</p>`,
        "pic04.jpg": `<h3 style="text-align: center;">Understanding the 
		Globalization of the Aquaculture Using Metabarcoding of Feeds</h3>
		<p style="text-align: justify;">Aquaculture is the fastest growing 
		source of food production, but most farmed fish and shrimp still 
		depend on feeds made with wild-caught species, raising sustainability 
		concerns. To see what wild species are harvested and used to grow the 
		world’s aquaculture products, we analyzed over 200 aquafeeds from 
		30 countries using DNA metabarcoding and identified over 3000 aquatic 
		species—about 7% of all fish species worldwide. We identified a few 
		globalized feed species that are widely used across nearly all of the 
		world’s major aquaculture producers. However, most species reflected 
		strong regional patterns tied to local harvest of biodiversity and 
		feed production. We also detected DNA from farmed species such as 
		Atlantic salmon, highlighting the cyclical nature of aquaculture 
		by-products and fisheries waste products. In this study, we also 
		introduced a novel probabilistic framework (supervised logit machine 
		learning classifier) that allowed us to separate true feed 
		constituents from contamination, rather than relying on binary 
		cut-offs widely used in metabarcoding to reduce false 
		positives.</p>`
        // add more as needed
    };

    // Open modal when image clicked
    $('.image.fit img').on('click', function (e) {
        e.preventDefault();
        const src = $(this).attr('src').split('/').pop(); // e.g., "pic01.jpg"
        const info = projectInfo[src] || "<p>No description available.</p>";

        // Include the image in the modal body
        $('#modal-body').html(`
            <img src="${$(this).attr('src')}" alt="Project Image">
            ${info}
        `);

        $('#project-modal').fadeIn();
    });

    // Close modal
    $(document).on('click', '.modal-close', function () {
        $('#project-modal').fadeOut();
    });

    // Close modal on background click
    $(document).on('click', '#project-modal', function (e) {
        if ($(e.target).is('#project-modal')) {
            $('#project-modal').fadeOut();
        }
    });
});
