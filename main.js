var api = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=";
function searchArticles(item) {
	$(".search-results").html("");
	$.ajax({
		type: "GET",
		url: api + item,
		dataType: "jsonp",
		crossDomain: true,
		success: function(results) {
			if (results[1].length === 0) {
				$(".loading").html("No results found.");
				$(".loading").removeClass("hidden");
			} else {
				var keywords = results[1];
				var descriptions = results[2];
				var urls = results[3];
				var html = "";
				for (var i = 0; i < keywords.length; i++) {
					html +=
						'<a target="_blank" href="' +
						urls[i] +
						'"><div class="card"><div class="title">' +
						keywords[i].toUpperCase() +
						'</div><div class="divider"></div><div class="desc">' +
						descriptions[i] +
						"</div></div></a>";
				}
				$(".loading").html("");
				$(".loading").addClass("hidden");
				if($("#searchBox").val() === item) {
					$(".search-results").html(html);
				} else if ($("#searchBox").val() === "") {
						$(".loading").html("Start typing to get results...");
						$(".loading").removeClass("hidden");
				}
			}
		}
	});
}

$(document).ready(function() {
	$("#random-article").on("click", function() {
		window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
	});

	$("#searchBox").on("keyup search", function() {
		$(".search-results").html("");
		$(".loading").html("Loading...");
		$(".loading").removeClass("hidden");
		var searchString = $(this).val();
		if (searchString !== "") {
			setTimeout(searchArticles(searchString), 2000);
		} else {
			$(".loading").html("Start typing to get results...");
			$(".loading").removeClass("hidden");
			$(".search-results").html("");
		}
	});
});
