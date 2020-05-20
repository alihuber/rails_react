// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require('@rails/ujs').start();
require('turbolinks').start();
require('@rails/activestorage').start();
// require('channels');

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
// Support component names relative to this directory:
const componentRequireContext = require.context('components', true);
const ReactRailsUJS = require('react_ujs');

ReactRailsUJS.useContext(componentRequireContext);

import '../stylesheets/application';
import './bootstrap_custom.js'

import Barba from 'barba.js'
import { HideShowTransition, FadeTransition } from './barbaTransitions'

/**
 * 
 * @param {Element} conatainerElement 
 */
function initAll(conatainerElement) {
  // initialize all js scripts inside conatainerElement
}


document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => initAll(document))
  Barba.Pjax.start()

  // From: http://barbajs.org/prefetch.html
  // With barba.js we can start prefetching the new page on the user's mouseover/touchstart on the link.
  // Since there is a 100-300ms delay during the user hover and the click, 
  // we can use this time to start prefetching the page. 
  // Most of the time this dead time is enough to get the next page ready!
  // !!! Be wise with the prefetching. Do not use it if you have a long list of links.
  Barba.Prefetch.init()

  let linkClicked = true
  Barba.Dispatcher.on('linkClicked', el => {
    linkClicked = true
  })
  Barba.Dispatcher.on('transitionCompleted', () => {
    linkClicked = false
    // Remove all classes that were added to high level containers.
    // In my case I'm adding this class to prevent page scroll when site menu is opened.
    // So I need to remove it when page should be changed.
    document.body.classList.remove('no-scroll')
  })

  Barba.Dispatcher.on('newPageReady', (currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) => {
    // safari needs some time, because it freezes without timeout on back swipe
    setTimeout(() => initAll(HTMLElementContainer))

    // Barba change page title automaticly.
    // But maybe you need to do somethig more, so you can use newPageRawHTML for that 
  })

  const isSafari = /^((?!chrome|android).)*safari/i.test(
    window.navigator.userAgent
  )
  Barba.Pjax.getTransition = function () {
    if (!isSafari) return FadeTransition

    return linkClicked ? FadeTransition : HideShowTransition
  }
})