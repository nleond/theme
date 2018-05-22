var MainModule = (function($){
  
  var $body = $('body')

  var extendLiveResults = function(){
    
    var $landingSearchTextInput = $('input.landing-search-text')
    var $landingLiveSearchContainer = $('.landing-live-search-container')
    
    if($landingSearchTextInput.val() !== ''){
      
      $landingLiveSearchContainer.addClass('visible')
    }
    else{
      
      $landingLiveSearchContainer.removeClass('visible')
    }
  }
  
  var menuHover = function(){
    
  }
  
  var switchAdvancedSearch = function(){
    
    var $advancedSearchPanel = $('.closable')
    
    $advancedSearchPanel.toggleClass('visible')
  }
  
  var closeAdvancedSearch = function(){
    
    var $advancedSearchPanel = $('.closable')
    
    $advancedSearchPanel.removeClass('visible')
  }
  
  var redirectToResultsPage = function(){
    
    if( $body.hasClass('home')){
      
      $('.landing-search-button').click(function(){
        
        window.location.href = "results-index_main.html"
      })
    }
    
    else if( $body.hasClass('data')){
      
      $('.landing-search-button').click(function(){
        
        window.location.href = "results-index_data.html"
      })
    }
    
    if( $body.hasClass('pubs')){
      
      $('.landing-search-button').click(function(){
        
        window.location.href = "results-index_pubs.html"
      })
    }
    
    if( $body.hasClass('lab')){
      
      $('.landing-search-button').click(function(){
        
        window.location.href = "results-index_lab.html"
      })
    }
  }

  var classifySubmenus = function(){
    
    $('li.menu-item').each(function(){
      
      if( $(this).find('ul.sub-menu').size() ){
        
        $(this).addClass('has-sub-menu')
      }
    })
  }
  
  
  return{
    extendLiveResults:extendLiveResults,
    menuHover:menuHover,
    switchAdvancedSearch:switchAdvancedSearch,
    closeAdvancedSearch:closeAdvancedSearch,
    redirectToResultsPage:redirectToResultsPage,
    classifySubmenus:classifySubmenus
  }
  
})(jQuery)

// monitor keyup on search bar
jQuery('input.landing-search-text').keyup(function(){
  
  MainModule.extendLiveResults()
})

jQuery('input.landing-search-text').focusout(function(){
  
  $('.landing-live-search-container').removeClass('visible')
})

jQuery('input.landing-search-text').focusin(function(){
  if($(this).val() !== ''){
    
    $('.landing-live-search-container').addClass('visible')
  }
})

jQuery('.advanced-search-link').click(function(){
  
  MainModule.switchAdvancedSearch()
  jQuery(this).addClass('hidden')
  jQuery('.domain-pills').addClass('short')
})

jQuery('.closable .close-btn').click(function(){
  
  MainModule.closeAdvancedSearch()
  jQuery('.advanced-search-link').removeClass('hidden')
  jQuery('.domain-pills').removeClass('short')
})

jQuery('.filter-pill').click(function(){
  
  $(this).toggleClass('selected')
})

jQuery(document).ready(function(){
  MainModule.redirectToResultsPage()
  MainModule.classifySubmenus()
})


