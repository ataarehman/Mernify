#!/usr/bin/env node
/**
 * Regenerates the 6 Mernify service landing pages using native Unifex/Home02
 * section classes (banner-two-area, feature-two-area, brand-area, faq-two-area,
 * cta-two-area, etc.) instead of the old custom .mernify-svc-* card layout.
 *
 * Usage: node _build-service-pages.cjs
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const MIRROR = path.join(ROOT, '..', 'mernify', 'mernify-web');
const HAS_MIRROR = fs.existsSync(MIRROR);

/* ------------------------------------------------------------------ */
/* Shared chrome — identical across pages, extracted from the shared   */
/* about/service-page shell (header-two, footer-two, script stack).    */
/* ------------------------------------------------------------------ */

const HEAD = (title, desc, keywords) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="${desc}">
    <meta name="keywords" content="${keywords}">
    <meta name="robots" content="INDEX,FOLLOW">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Title -->
    <title>${title}</title>
    <!-- Favicon -->
    <link rel="icon" href="assets/images/logo/favicon.svg" type="image/svg+xml">
    <link rel="alternate icon" href="assets/images/logo/favicon.svg">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- Swiper Bundle -->
    <link rel="stylesheet" href="assets/css/swiper-bundle.css">
    <!-- Magnific Popup -->
    <link rel="stylesheet" href="assets/css/magnific-popup.css">
    <!-- aos -->
    <link rel="stylesheet" href="assets/css/aos.css">
    <!-- Main css -->
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/mernify-brand.css">
    <link rel="stylesheet" href="assets/css/mernify-service-pages.css">
</head>

<body class="tw-magic-cursor">
    <!--==================== Preloader Start ====================-->
    <div class="preloader">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
           <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
        </svg>
        <div class="preloader-heading">
            <div class="load-text">
               <span>L</span>
               <span>o</span>
               <span>a</span>
               <span>d</span>
               <span>i</span>
               <span>n</span>
               <span>g</span>
            </div>
         </div>
    </div>
    <!--==================== Preloader End ====================-->


    <!--==================== Overlay Start ====================-->
    <div class="overlay"></div>
    <!--==================== Overlay End ====================-->

    <!--==================== Sidebar Overlay End ====================-->
    <div class="side-overlay"></div>
    <!--==================== Sidebar Overlay End ====================-->


    <!--==================== Begin Magic Cursor Start ====================-->
    <div id="magic-cursor">
        <div id="ball"></div>
    </div>
    <!--==================== Begin Magic Cursor End ====================-->


    <!-- Custom Toast Message start -->
    <div id="toast-container"></div>
    <!-- Custom Toast Message End -->

    <!-- ==================== Scroll to Top End Here ==================== -->
    <div class="back-to-top-wrapper">
        <button id="back_to_top" type="button" class="back-to-top-btn">
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 6L6 1L1 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
    <!-- ==================== Scroll to Top End Here ==================== -->




    <!-- ==================== Offcanvus Mobile Menu Start Here ==================== -->
    <div class="twoffcanvas-area">
        <div class="twoffcanvas">
            <div class="twoffcanvas__close-btn">
                <button class="close-btn"><i class="ph ph-x"></i></button>
            </div>
            <div class="twoffcanvas__logo">
                <a href="index.html">
                    <span class="mernify-logo">
                        <img src="assets/images/logo/logo-black.svg" alt="Mernify" class="mernify-logo__dark" width="140" height="49">
                        <img src="assets/images/logo/logo-white.svg" alt="Mernify" class="mernify-logo__light" width="140" height="49">
                    </span>
                </a>
            </div>
            <div class="twoffcanvas__title">
                <p>Focused product-engineering partner for startups, growing businesses, and enterprises.</p>
            </div>
            <div class="tw-main-menu-mobile d-xl-none"></div>
            <div class="twoffcanvas__contact-info">
                <div class="twoffcanvas__contact-title">
                    <h5>Contact us</h5>
                </div>
                <ul>
                    <li>
                        <i class="ph ph-map-pin-line"></i>
                        <a href="https://www.google.com/maps/@23.8223586,90.3661283,15z" target="_blank">Remote-first · Global collaboration</a>
                    </li>
                    <li>
                        <i class="ph ph-envelope-simple-open"></i>
                        <a href="mailto:hello@mernify.com"><span class="__cf_email__">hello@mernify.com</span></a>
                    </li>
                    <li>
                        <i class="ph ph-phone-call"></i>
                        <a href="mailto:hello@mernify.com">hello@mernify.com</a>
                    </li>
                </ul>
            </div>
            <div class="twoffcanvas__input">
                <div class="twoffcanvas__input-title">
                    <h4>Get UPdate</h4>
                </div>
                <form action="#">
                    <div class="position-relative">
                        <input class="form-control bg-white shadow-none border border-neutral-200 text-heading tw-ps-6 tw-pe-13 focus-border-main-two-600 tw-placeholder-text-neutral-900 focus-tw-placeholder-text-hidden tw-placeholder-transition-2" type="text" placeholder="Enter mail">
                        <button>
                            <i class="ph ph-paper-plane-tilt"></i>
                        </button>
                    </div>
                </form>
            </div>
            <div class="twoffcanvas__social">
                <div class="social-icon">
                    <a href="#"><i class="ph ph-facebook-logo"></i></a>
                    <a href="#"><i class="ph ph-instagram-logo"></i></a>
                    <a href="#"><i class="ph ph-twitter-logo"></i></a>
                    <a href="#"><i class="ph ph-pinterest-logo"></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="body-overlay"></div>
    <!-- ==================== Offcanvus Mobile Menu End Here ==================== -->




    <!-- ==================== Header Start Here ==================== -->
    <header class="header header-two tw-transition-all tw-z-99 position-relative">
        <div class="container tw-container-1800-px">
            <nav class="d-flex align-items-center justify-content-between position-relative">
                <!-- Logo Start -->
                <div class="logo">
                    <a href="index.html" class="link">
                        <span class="mernify-logo">
                        <img src="assets/images/logo/logo-black.svg" alt="Mernify" class="mernify-logo__dark" width="140" height="49">
                        <img src="assets/images/logo/logo-white.svg" alt="Mernify" class="mernify-logo__light" width="140" height="49">
                    </span>
                    </a>
                </div>
                <!-- Logo End  -->

                <!-- Menu Start  -->
                <div class="header-menu header-two-menu d-xl-block d-none">
                    <!-- Nav menu Start -->
                    <div class="main-menu">
                        <nav class="tw-main-menu-content">
                            <ul>
                                <li class="p-static has-dropdown"><a class="color-active" href="index.html">Home</a>
                                    <!-- mega menu start -->
                                    <div class="tw-submenu submenu has-homemenu">
                                        <div class="row gx-6 row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-4">
                                            <div class="col homemenu">
                                                <div class="homemenu-thumb tw-mb-4">
                                                    <img src="assets/images/thumbs/home1.jpg" alt="home-one">
                                                    <div class="homemenu-btn w-100">
                                                        <div class="tw-mb-2">
                                                            <a class="bg-main-two-600 text-white fw-semibold tw-py-3 tw-text-sm d-inline-block hover-bg-white hover-text-heading menu-btn show-1" href="index.html">
                                                                Multi Page
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="homemenu-content text-center">
                                                    <h4 class="homemenu-title">
                                                        <a href="index.html">Home 01</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div class="col homemenu">
                                                <div class="homemenu-thumb tw-mb-4">
                                                    <img src="assets/images/thumbs/home2.jpg" alt="home-two">
                                                    <div class="homemenu-btn w-100">
                                                        <div class="tw-mb-2">
                                                            <a class="bg-main-two-600 text-white fw-semibold tw-py-3 tw-text-sm d-inline-block hover-bg-white hover-text-heading menu-btn show-1" href="index-2.html">
                                                                Multi Page
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="homemenu-content text-center">
                                                    <h4 class="homemenu-title">
                                                        <a href="index-2.html">Home 02</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div class="col homemenu">
                                                <div class="homemenu-thumb tw-mb-4">
                                                    <img src="assets/images/thumbs/home3.jpg" alt="home-three">
                                                    <div class="homemenu-btn w-100">
                                                        <div class="tw-mb-2">
                                                            <a class="bg-main-two-600 text-white fw-semibold tw-py-3 tw-text-sm d-inline-block hover-bg-white hover-text-heading menu-btn show-1" href="index-3.html">
                                                                Multi Page
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="homemenu-content text-center">
                                                    <h4 class="homemenu-title">
                                                        <a href="index-3.html">Home 03</a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div class="col homemenu">
                                                <div class="homemenu-thumb tw-mb-4">
                                                    <img src="assets/images/thumbs/coming-soon-img.png" alt="coming-soon">
                                                </div>
                                                <div class="homemenu-content text-center">
                                                    <h4 class="homemenu-title">
                                                        <a href="#">Coming Soon</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- mega menu end -->
                                </li>
                                <li><a href="about.html">About Us</a></li>
                                <li class="p-static has-dropdown"><a href="service.html">Services</a>
                                    <!-- Services mega menu start -->
                                    <div class="tw-submenu submenu has-servicemenu">
                                        <div class="mernify-svc-mega" data-mernify-svc-mega>
                                            <ul class="mernify-svc-mega__nav" role="tablist" aria-label="Service categories">
                                                <li>
                                                    <a class="mernify-svc-mega__cat is-active" href="service-product-engineering.html" data-svc="product-engineering" role="tab" aria-selected="true">
                                                        <span class="mernify-svc-mega__cat-label"><i class="ph ph-cube mernify-svc-mega__cat-icon" aria-hidden="true"></i><span>Product Engineering</span></span>
                                                        <i class="ph ph-caret-right mernify-svc-mega__cat-arrow" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="mernify-svc-mega__cat" href="service-saas-development.html" data-svc="saas-development" role="tab" aria-selected="false">
                                                        <span class="mernify-svc-mega__cat-label"><i class="ph ph-squares-four mernify-svc-mega__cat-icon" aria-hidden="true"></i><span>SaaS Development</span></span>
                                                        <i class="ph ph-caret-right mernify-svc-mega__cat-arrow" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="mernify-svc-mega__cat" href="service-web-development.html" data-svc="web-development" role="tab" aria-selected="false">
                                                        <span class="mernify-svc-mega__cat-label"><i class="ph ph-globe mernify-svc-mega__cat-icon" aria-hidden="true"></i><span>Web Development</span></span>
                                                        <i class="ph ph-caret-right mernify-svc-mega__cat-arrow" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="mernify-svc-mega__cat" href="service-mobile-app-development.html" data-svc="mobile-app-development" role="tab" aria-selected="false">
                                                        <span class="mernify-svc-mega__cat-label"><i class="ph ph-device-mobile mernify-svc-mega__cat-icon" aria-hidden="true"></i><span>Mobile App Development</span></span>
                                                        <i class="ph ph-caret-right mernify-svc-mega__cat-arrow" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="mernify-svc-mega__cat" href="service-ai-integration.html" data-svc="ai-integration" role="tab" aria-selected="false">
                                                        <span class="mernify-svc-mega__cat-label"><i class="ph ph-sparkle mernify-svc-mega__cat-icon" aria-hidden="true"></i><span>AI Integration</span></span>
                                                        <i class="ph ph-caret-right mernify-svc-mega__cat-arrow" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a class="mernify-svc-mega__cat" href="service-ui-ux-design.html" data-svc="ui-ux-design" role="tab" aria-selected="false">
                                                        <span class="mernify-svc-mega__cat-label"><i class="ph ph-pen-nib mernify-svc-mega__cat-icon" aria-hidden="true"></i><span>UI/UX Design</span></span>
                                                        <i class="ph ph-caret-right mernify-svc-mega__cat-arrow" aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div class="mernify-svc-mega__panels">
                                                <div class="mernify-svc-mega__panel is-active" data-svc="product-engineering" role="tabpanel">
                                                    <span class="mernify-svc-mega__eyebrow">Capabilities</span>
                                                    <h3 class="mernify-svc-mega__title">Product Engineering</h3>
                                                    <p class="mernify-svc-mega__desc">End-to-end product engineering that connects strategy, UX, and full-stack delivery so teams ship reliable software without juggling disconnected vendors.</p>
                                                    <ul class="mernify-svc-mega__caps">
                                                        <li>Discovery through architecture</li>
                                                        <li>Cross-functional delivery pods</li>
                                                        <li>MVP to scale roadmap</li>
                                                        <li>Technical ownership after launch</li>
                                                    </ul>
                                                    <a class="mernify-svc-mega__cta" href="service-product-engineering.html">Explore service <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
                                                </div>
                                                <div class="mernify-svc-mega__panel" data-svc="saas-development" role="tabpanel">
                                                    <span class="mernify-svc-mega__eyebrow">Capabilities</span>
                                                    <h3 class="mernify-svc-mega__title">SaaS Development</h3>
                                                    <p class="mernify-svc-mega__desc">We design and build SaaS products with clean tenancy models, role-based access, admin systems, and APIs prepared for growth.</p>
                                                    <ul class="mernify-svc-mega__caps">
                                                        <li>Multi-tenant architecture</li>
                                                        <li>Admin &amp; customer portals</li>
                                                        <li>Subscription-ready foundations</li>
                                                        <li>Observability &amp; release process</li>
                                                    </ul>
                                                    <a class="mernify-svc-mega__cta" href="service-saas-development.html">Explore service <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
                                                </div>
                                                <div class="mernify-svc-mega__panel" data-svc="web-development" role="tabpanel">
                                                    <span class="mernify-svc-mega__eyebrow">Capabilities</span>
                                                    <h3 class="mernify-svc-mega__title">Web Development</h3>
                                                    <p class="mernify-svc-mega__desc">Modern web platforms, portals, and marketing-adjacent product experiences engineered for performance, security, and long-term maintainability.</p>
                                                    <ul class="mernify-svc-mega__caps">
                                                        <li>Customer &amp; internal portals</li>
                                                        <li>Performance-focused frontends</li>
                                                        <li>Secure API integration</li>
                                                        <li>Accessibility-minded UI</li>
                                                    </ul>
                                                    <a class="mernify-svc-mega__cta" href="service-web-development.html">Explore service <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
                                                </div>
                                                <div class="mernify-svc-mega__panel" data-svc="mobile-app-development" role="tabpanel">
                                                    <span class="mernify-svc-mega__eyebrow">Capabilities</span>
                                                    <h3 class="mernify-svc-mega__title">Mobile App Development</h3>
                                                    <p class="mernify-svc-mega__desc">Cross-platform and native-quality mobile applications with thoughtful UX, solid APIs, and release pipelines ready for App Store and Play.</p>
                                                    <ul class="mernify-svc-mega__caps">
                                                        <li>iOS &amp; Android delivery</li>
                                                        <li>React Native &amp; Flutter</li>
                                                        <li>Mobile API design</li>
                                                        <li>Store submission support</li>
                                                    </ul>
                                                    <a class="mernify-svc-mega__cta" href="service-mobile-app-development.html">Explore service <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
                                                </div>
                                                <div class="mernify-svc-mega__panel" data-svc="ai-integration" role="tabpanel">
                                                    <span class="mernify-svc-mega__eyebrow">Capabilities</span>
                                                    <h3 class="mernify-svc-mega__title">AI Integration</h3>
                                                    <p class="mernify-svc-mega__desc">We integrate assistants, search, and model-powered features into real products with clear success criteria, governance, and maintainable architecture.</p>
                                                    <ul class="mernify-svc-mega__caps">
                                                        <li>Product-embedded assistants</li>
                                                        <li>Intelligent search &amp; RAG</li>
                                                        <li>Model provider integrations</li>
                                                        <li>Evaluation &amp; guardrails</li>
                                                    </ul>
                                                    <a class="mernify-svc-mega__cta" href="service-ai-integration.html">Explore service <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
                                                </div>
                                                <div class="mernify-svc-mega__panel" data-svc="ui-ux-design" role="tabpanel">
                                                    <span class="mernify-svc-mega__eyebrow">Capabilities</span>
                                                    <h3 class="mernify-svc-mega__title">UI/UX Design</h3>
                                                    <p class="mernify-svc-mega__desc">Product design and UX that clarifies journeys, prototypes decisions early, and hands engineering a buildable system.</p>
                                                    <ul class="mernify-svc-mega__caps">
                                                        <li>Discovery workshops</li>
                                                        <li>User flows &amp; wireframes</li>
                                                        <li>High-fidelity UI systems</li>
                                                        <li>Interactive prototypes</li>
                                                    </ul>
                                                    <a class="mernify-svc-mega__cta" href="service-ui-ux-design.html">Explore service <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Services mega menu end -->
                                </li>
                                <li class="has-dropdown"><a href="#">Pages</a>
                                    <ul class="submenu tw-submenu">
                                        <li><a href="about.html">About Us</a></li>
                                        <li><a href="team.html">Our Team</a></li>
                                        <li><a href="testimonial.html">Testimonials</a></li>
                                        <li><a href="contact.html">Pricing</a></li>
                                        <li><a href="portfolio-one.html">Portfolio One</a></li>
                                        <li><a href="portfolio-two.html">Portfolio Two</a></li>
                                        <li><a href="portfolio-three.html">Portfolio Theee</a></li>
                                        <li><a href="portfolio-four.html">Portfolio Four</a></li>
                                        <li><a href="portfolio-details.html">Portfolio Details</a></li>
                                        <li><a href="faq.html">Our Faq</a></li>
                                        <li><a href="error.html">Error</a></li>
                                    </ul>
                                </li>
                                <li class="has-dropdown"><a href="blog.html">Blog</a>
                                    <ul class="submenu tw-submenu">
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="blog-list.html">Blog List</a></li>
                                        <li><a href="blog-details.html">Blog Details</a></li>
                                    </ul>
                                </li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </nav>
                    </div>
                    <!-- Nav menu End  -->
                </div>
                <!-- Menu End  -->

                <!-- Header Right start -->
                <div class="header-right d-flex align-items-center tw-gap-205">

                    <!-- Button Start  -->
                    <div class="header-button d-none d-md-block">
                        <a class="tw-hover-btn bg-main-two-600 text-white fw-bold tw-py-2 tw-px-10 d-inline-flex hover-text-main-two-600 tw-rounded-lg" href="contact.html">
                            Discuss Your Project
                            <span class="tw-hover-btn-circle-dot bg-black"></span>
                        </a>
                    </div>
                    <!-- Button End  -->

                    <!-- Button Start  -->
                    <div class="header-button">
                        <button type="button" class="tw-menu-bar tw-hover-btn bg-main-two-600 text-white fw-bold tw-py-2 tw-px-10 d-inline-flex align-items-center tw-gap-2 hover-text-main-two-600 tw-rounded-lg tw-transition-3">
                            <span class="tw-transition-3"><i class="ph-bold ph-plus"></i></span> Menu
                            <span class="tw-hover-btn-circle-dot bg-black"></span>
                        </button>
                    </div>
                    <!-- Button End  -->

                </div>

                <!-- Header Right End  -->
            </nav>
        </div>
    </header>
    <!-- ==================== Header End Here ==================== -->
    
    <div id="smooth-wrapper">
        <div id="smooth-content">
`;

const FOOTER_AND_SCRIPTS = `
        <!-- ==================== Service CTA End ==================== -->

<footer class="footer-two-area pt-120 @@footerportfolioipfourClass">
                <div class="footer-two-top tw-pb-16 position-relative z-1">
                    <div class="container tw-container-1800-px">
                        <div class="row row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1">
                            <div class="col">
                                <div class="footer-two-col-1 position-relative h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                    <div class="tw-mb-8">
                                        <a href="index.html"><span class="mernify-logo">
                        <img src="assets/images/logo/logo-black.svg" alt="Mernify" class="mernify-logo__dark" width="140" height="49">
                        <img src="assets/images/logo/logo-white.svg" alt="Mernify" class="mernify-logo__light" width="140" height="49">
                    </span></a>
                                    </div>
                                    <div class="tw-mb-8">
                                        <p class="tw-text-lg">Modern technology. Reliable execution. Measurable business value. </p>
                                    </div>
                                    <div class="footer-two-form tw-rounded-lg position-relative z-1">
                                        <input type="text" class="footer-input form-control bg-transparent shadow-none border border-neutral-200 rounded-0 text-heading tw-ps-4 tw-py-4 tw-pe-18 tw-rounded-lg focus-border-main-two-600 font-body focus-tw-placeholder-text-hidden tw-placeholder-transition-2" placeholder="Your Email">
                                        <button class="footer-two-button bg-main-two-600 tw-w-15 h-100 position-absolute top-50 end-0 translate-middle-y"><span><img src="assets/images/icons/paper-two-arrow.svg" alt="paper"></span></button>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="footer-two-col-2 position-relative h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                    <h2 class="tw-text-2xl fw-medium text-black tw-mb-10">Quick Links</h2>
                                    <ul class="d-flex flex-column tw-gap-5">
                                        <li>
                                            <a href="index.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Home</a>
                                        </li>
                                        <li>
                                            <a href="about.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">About</a>
                                        </li>
                                        <li>
                                            <a href="contact.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Contact Us</a>
                                        </li>
                                        <li>
                                            <a href="portfolio.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Case Studies</a>
                                        </li>
                                        <li class="mb-0">
                                            <a href="javascript:void(0)" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Case Studies</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col">
                                <div class="footer-two-col-3 position-relative h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                    <h2 class="tw-text-2xl fw-medium text-black tw-mb-10">Our Services</h2>
                                    <ul class="d-flex flex-column tw-gap-5">
                                        <li>
                                            <a href="service.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Product Engineering</a>
                                        </li>
                                        <li>
                                            <a href="team.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">SaaS Development</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Web Development</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Mobile Apps</a>
                                        </li>
                                        <li>
                                            <a href="contact.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">AI Integration</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col">
                                <div class="footer-two-col-4 position-relative h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                    <h2 class="tw-text-2xl fw-medium text-black tw-mb-10">Social Media</h2>
                                    <ul class="d-flex flex-column tw-gap-5">
                                        <li>
                                            <a href="service.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Facebook</a>
                                        </li>
                                        <li>
                                            <a href="team.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Twitter</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Instagram</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0)" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Linkedin</a>
                                        </li>
                                        <li>
                                            <a href="contact.html" class="text-heading tw-text-lg hover-text-main-two-600 d-inline-flex align-items-center tw-gap-2">Dribbble</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col">
                                <div class="footer-two-col-5 position-relative" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                                    <h2 class="tw-text-2xl fw-medium text-black tw-mb-10">Contact Info</h2>
                                    <div class="tw-mb-6">
                                        <ul>
                                            <li class="text-black tw-mb-4"><a class="text-black hover-text-main-two-600" href="mailto:hello@mernify.com">hello@mernify.com</a></li>
                                            <li class="text-black tw-mb-4"><a class="text-black hover-text-main-two-600" href="mailto:hello@mernify.com">hello@mernify.com</a></li>
                                            <li class="text-black tw-mb-4">Remote-first · Global collaboration</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <a class="tw-text-lg fw-semibold text-main-two-600" href="#">Discuss Your Project</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="container tw-container-1800-px">
                        <!-- bottom Footer -->
                        <div class="footer-two-bottom">
                            <div class="tw-py-8">
                                <div class="container container-two">
                                    <div class="footer-two-copyright-wrapper d-flex align-items-center justify-content-center">
                                        <p class="text-heading tw-text-lg text-line-1 fw-medium">© 2026 Mernify. All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <!-- Jquery js -->
    <script src="assets/js/jquery-3.7.1.min.js"></script>
    <!-- phosphor Js -->
    <script src="assets/js/phosphor-icon.js"></script>
    <!-- Bootstrap Bundle Js -->
    <script src="assets/js/boostrap.bundle.min.js"></script>
    <!-- aos -->
    <script src="assets/js/aos.js"></script>
    <!-- magnific popup js -->
    <script src="assets/js/magnific-popup.min.js"></script>
    <!-- marquee -->
    <script src="assets/js/jquery.marquee.min.js"></script>
    <!-- counterup js -->
    <script src="assets/js/purecounter.js"></script>
    <!-- swiper bundle js -->
    <script src="assets/js/swiper-bundle.min.js"></script>


    <!-- gsap js -->
    <script src="assets/js/gsap/gsap.js"></script>
    <!-- Scroll plugin -->
    <script src="assets/js/gsap/gsap-scroll-to-plugin.js"></script>
    <!-- Scroll smoother -->
    <script src="assets/js/gsap/gsap-scroll-smoother.js"></script>
    <!-- Scroll Trigger -->
    <script src="assets/js/gsap/gsap-scroll-trigger.js"></script>
    <!-- split text -->
    <script src="assets/js/gsap/gsap-split-text.js"></script>
    <!-- chroma js -->
    <script src="assets/js/gsap/chroma.min.js"></script>



    <!-- custom GSAP -->
    <script src="assets/js/slider-active.js"></script>
    <!-- custom GSAP -->
    <script src="assets/js/custom-gsap.js"></script>
    <!-- main js -->
    <script src="assets/js/main.js"></script>
    <script src="assets/js/mernify-services-mega.js"></script>
    <!-- cursor js -->
    <script src="assets/js/tw-cursor.js"></script>
</body>

</html>`;

/* ------------------------------------------------------------------ */
/* Brand logo pool for the "Technology" brand-area section             */
/* ------------------------------------------------------------------ */

const LOGO_POOL = [
  ['marquee-two-thumb1.png', 'marquee-two-thumb11.png'],
  ['marquee-two-thumb2.png', 'marquee-two-thumb22.png'],
  ['marquee-thumb5.png', 'marquee-thumb55.png'],
  ['marquee-two-thumb4.png', 'marquee-two-thumb44.png'],
  ['marquee-thumb3.png', 'marquee-thumb33.png'],
  ['marquee-thumb1.png', 'marquee-thumb11.png'],
  ['marquee-thumb6.png', 'marquee-thumb66.png'],
  ['marquee-thumb2.png', 'marquee-thumb22.png'],
  ['marquee-two-thumb6.png', 'marquee-two-thumb66.png'],
  ['marquee-two-thumb7.png', 'marquee-two-thumb77.png'],
];

function rotate(arr, n) {
  const len = arr.length;
  const offset = ((n % len) + len) % len;
  return arr.slice(offset).concat(arr.slice(0, offset));
}

function brandArea(pageIndex, headingHtml) {
  const logos = rotate(LOGO_POOL, pageIndex * 2).slice(0, 8);
  const [l1, l2, l3, l4, l5, l6, l7, l8] = logos;
  const item = (logo, delay) => `<div class="col-xl-2 col-lg-6 col-md-6">
                            <div class="brand-item position-relative z-1 tw-mb-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${delay}">
                                <span class="brand-active-media"><img src="assets/images/thumbs/${logo[0]}" alt="thumb"></span>
                                <span class="brand-hover-media"><img src="assets/images/thumbs/${logo[1]}" alt="thumb"></span>
                            </div>
                        </div>`;
  return `
            <!-- ======================== Technology / brand section start =========================== -->
            <div class="brand-area py-120">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-8">
                            <div class="text-center tw-mb-15" data-aos="fade-up" data-aos-duration="1000">
                                <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( Technology )</span>
                                <h2 class="section-title-one tw-text-15 tw-itm-title tw-itm-anim text-center">${headingHtml}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row gx-1">
                        ${item(l1, 100)}
                        ${item(l2, 200)}
                        <div class="col-xl-2"></div>
                        ${item(l3, 300)}
                        <div class="col-xl-2"></div>
                        ${item(l4, 400)}
                    </div>
                    <div class="row gx-1">
                        <div class="col-xl-2"></div>
                        ${item(l5, 100)}
                        ${item(l6, 200)}
                        <div class="col-xl-2"></div>
                        ${item(l7, 300)}
                        ${item(l8, 400)}
                    </div>
                </div>
            </div>
            <!-- ======================== Technology / brand section end =========================== -->
`;
}

/* ------------------------------------------------------------------ */
/* Section builders                                                    */
/* ------------------------------------------------------------------ */

function heroSection(s) {
  const tags = s.heroTags
    .map(
      (t) =>
        `<li><a class="text-heading fw-semibold hover-bg-main-two-600 hover-border-main-two-600 hover-text-white" href="#capabilities">${t}</a></li>`
    )
    .join('\n                                            ');
  return `
            <!-- ==================== Hero Start ==================== -->
            <section class="banner-two-area">
                <div class="container tw-container-1800-px">
                    <div class="banner-two-top tw-pb-12">
                        <div class="row align-items-center">
                            <div class="col-xl-4 col-lg-6">
                                <div class="banner-two-left" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                    <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( ${s.heroEyebrow} )</span>
                                    <p class="tw-text-605 fw-medium text-heading">${s.heroParagraph}</p>
                                    <div class="d-flex flex-wrap tw-gap-4 tw-mt-8">
                                        <a class="tw-hover-btn bg-main-600 text-heading fw-bold tw-py-4 tw-px-10 d-inline-block hover-text-main-two-600 tw-rounded-4xl" href="contact.html">Discuss Your Project<span class="tw-hover-btn-circle-dot bg-white"></span></a>
                                        <a class="tw-hover-btn bg-transparent border border-neutral-900 text-heading fw-bold tw-py-4 tw-px-10 d-inline-block tw-rounded-4xl" href="#capabilities">Explore capabilities</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6">
                                <div class="banner-thumb banner-two-thumb w-100 tw-clip-anim">
                                    <img class="tw-anim-img w-100" data-animate="true" src="${s.heroImage}" alt="${s.navLabel}">
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-10">
                                <div class="banner-two-right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                    <div class="banner-two-tag">
                                        <ul>
                                            ${tags}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12">
                            <div>
                                <h2 class="banner-two-title text-uppercase fw-bold tw-char-animation">${s.heroTitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ==================== Hero End ==================== -->

            <div class="thumbnail-bg thumbnail-two-bg overflow-hidden">
                <img class="object-fit-cover w-100 tw-h-950-px" data-speed="0.1" src="${s.parallaxImage}" alt="thumbnail">
            </div>
`;
}

function overviewSection(s) {
  const points = s.overviewPoints
    .map(
      (p) =>
        `<div class="d-flex tw-gap-15 tw-mb-8">
                                    <div class="tw-w-8 flex-shrink-0">
                                        <i class="ph-bold ph-check-circle text-main-two-600 tw-text-2xl" aria-hidden="true"></i>
                                    </div>
                                    <p class="tw-text-605 fw-medium text-heading mb-0">${p}</p>
                                </div>`
    )
    .join('\n                                ');
  return `
            <!-- ==================== Overview Start ==================== -->
            <section class="about-ip-area py-120">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-9">
                            <div class="section-wrapper-one tw-pb-25 text-center" data-aos="fade-up" data-aos-duration="1000">
                                <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( ${s.overviewKicker} )</span>
                                <h2 class="section-title-one tw-text-15 tw-itm-title tw-itm-anim text-center">${s.overviewTitle}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-between align-items-center">
                        <div class="col-xl-5">
                            <div class="about-ip-thumb" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                <img class="tw-rounded-lg w-100" src="${s.overviewImage}" alt="${s.navLabel}">
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="about-ip-right" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                <p class="tw-text-lg tw-mb-10">${s.overviewLead}</p>
                                ${points}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ==================== Overview End ==================== -->
`;
}

function capabilitiesSection(s) {
  const cards = s.capabilities
    .map(
      (c, i) => `<div class="col-xl-6 col-lg-6">
                            <div class="service-two-wrapper bg-white h-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${i * 100}">
                                <div class="d-flex align-items-center tw-gap-15 tw-mb-6">
                                    <div class="tw-w-15 tw-h-15 flex-shrink-0 d-inline-flex align-items-center justify-content-center bg-main-600 text-heading tw-rounded-lg tw-text-2xl">
                                        <i class="ph-bold ${c.icon}" aria-hidden="true"></i>
                                    </div>
                                    <h3 class="tw-text-2xl fw-semibold mb-0">${c.title}</h3>
                                </div>
                                <div class="service-two-wrap d-flex align-items-end justify-content-between tw-gap-6">
                                    <div>
                                        <p class="service-two-paragraph tw-text-lg mb-0">${c.desc}</p>
                                    </div>
                                    <div>
                                        <a class="tw-w-21 tw-h-21 lh-1 d-inline-flex justify-content-center align-items-center bg-main-two-600 text-white tw-text-10 tw-rounded-lg flex-shrink-0" href="#process"><i class="ph ph-arrow-up-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>`
    )
    .join('\n                        ');
  return `
            <!-- ==================== Capabilities Start ==================== -->
            <section class="pt-120 pb-120" id="capabilities">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-8">
                            <div class="section-wrapper-one text-center tw-mb-15" data-aos="fade-up" data-aos-duration="1000">
                                <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( Capabilities )</span>
                                <h2 class="section-title-one tw-text-15 tw-itm-title tw-itm-anim text-center">${s.capabilitiesTitle}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row row-cols-xl-2 row-cols-lg-2 row-cols-md-1 row-cols-1 gx-4 gy-4">
                        ${cards}
                    </div>
                </div>
            </section>
            <!-- ==================== Capabilities End ==================== -->
`;
}

function processSection(s) {
  const icons = [1, 2, 3, 4];
  const cards = s.process
    .map(
      (p, i) => `<div class="col-xl-3 col-lg-6 col-md-6">
                            <div class="feature-two-wrapper tw-pt-5 tw-px-16 text-center tw-mb-705 tw-rounded-lg tw-transition-3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${i * 100 + 200}">
                                <span class="feature-two-step bg-main-600 text-heading tw-py-1 tw-px-7 tw-rounded-4xl fw-medium tw-mb-28 tw-transition-3">Step 0${i + 1}</span>
                                <div class="feature-two-icon tw-mb-6">
                                    <span><img class="tw-transition-3" src="assets/images/icons/feature-two-icon${icons[i]}.svg" alt="icon${icons[i]}"></span>
                                </div>
                                <div class="feature-two-content">
                                    <h2 class="feature-two-title tw-text-9 text--white tw-mb-6"><a class="tw-transition-3" href="#process">${p.title}</a></h2>
                                    <p class="feature-two-paragraph text--white tw-text-lg tw-transition-3">${p.desc}</p>
                                </div>
                            </div>
                        </div>`
    )
    .join('\n                        ');
  return `
            <!-- ==================== Process Start ==================== -->
            <section class="pt-120" id="process">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-8">
                            <div class="section-wrapper-one text-center tw-mb-15" data-aos="fade-up" data-aos-duration="1000">
                                <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( Our Process )</span>
                                <h2 class="section-title-one tw-text-15 tw-itm-title tw-itm-anim text-center">${s.processTitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="feature-two-area tw-pb-17">
                <div class="container tw-container-1800-px">
                    <div class="row gx-1">
                        ${cards}
                    </div>
                </div>
            </section>
            <!-- ==================== Process End ==================== -->
`;
}

function benefitsSection(s) {
  const cards = s.benefits
    .map(
      (b, i) => `<div class="col-xl-4 col-lg-6">
                            <div class="service-two-wrapper bg-white h-100 text-center" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${i * 100}">
                                <h2 class="service-ip-counter-title tw-text-8xl fw-semibold font-heading tw-mb-4 lh-1 text-main-two-600">${b.stat}</h2>
                                <h3 class="tw-text-2xl fw-semibold tw-mb-4">${b.title}</h3>
                                <p class="tw-text-lg mb-0">${b.desc}</p>
                            </div>
                        </div>`
    )
    .join('\n                        ');
  return `
            <!-- ==================== Outcomes Start ==================== -->
            <section class="pt-120 pb-120">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-8">
                            <div class="section-wrapper-one text-center tw-mb-15" data-aos="fade-up" data-aos-duration="1000">
                                <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( Outcomes )</span>
                                <h2 class="section-title-one tw-text-15 tw-itm-title tw-itm-anim text-center">What You Can Expect</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row row-cols-xl-3 row-cols-lg-3 row-cols-md-1 row-cols-1 gx-4 gy-4">
                        ${cards}
                    </div>
                </div>
            </section>
            <!-- ==================== Outcomes End ==================== -->
`;
}

function useCasesSection(s) {
  const cards = s.useCases
    .map(
      (c, i) => `<div class="col-xl-4 col-lg-6">
                            <div class="tw-mb-8" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${i * 100}">
                                <div class="portfolio-two-thumb not-hide-cursor position-relative z-1 portfolio-panel tw-mb-6" data-cursor="View">
                                    <a class="d-block cursor-hide" href="contact.html"><img class="tw-rounded-lg w-100" src="${c.image}" alt="${c.title}"></a>
                                    <div class="portfolio-list portfolio-two-list top position-absolute top-0 start-0 tw-ms-11 tw-mt-11">
                                        <ul class="d-flex tw-gap-205 flex-wrap">
                                            <li><a class="text-uppercase text-white fw-medium position-relative z-1 hover-bg-white hover-border-white hover-text-heading tw-transition-3" href="#">${c.tag}</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <h3 class="tw-text-2xl fw-semibold tw-mb-3">${c.title}</h3>
                                <p class="tw-text-lg mb-0">${c.desc}</p>
                            </div>
                        </div>`
    )
    .join('\n                        ');
  return `
            <!-- ==================== Use Cases Start ==================== -->
            <section class="pt-120 pb-120">
                <div class="container tw-container-1800-px">
                    <div class="row justify-content-center">
                        <div class="col-xl-8">
                            <div class="section-wrapper-one text-center tw-mb-15" data-aos="fade-up" data-aos-duration="1000">
                                <span class="fw-medium text-uppercase text-heading tw-mb-4 d-inline-block">( Use Cases )</span>
                                <h2 class="section-title-one tw-text-15 tw-itm-title tw-itm-anim text-center">Where This Fits</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        ${cards}
                    </div>
                </div>
            </section>
            <!-- ==================== Use Cases End ==================== -->
`;
}

function faqSection(s) {
  const items = s.faqs
    .map((f, i) => {
      const n = i + 1;
      const active = i === 0;
      return `
                                    <div class="accordion-items bg-white${active ? ' tw-faq-active' : ''}">
                                        <h2 class="accordion-header" id="${s.faqIdPrefix}-heading-${n}">
                                            <button class="accordion-buttons${active ? '' : ' collapsed'}" type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#${s.faqIdPrefix}-collapse-${n}"
                                                aria-expanded="${active ? 'true' : 'false'}"
                                                aria-controls="${s.faqIdPrefix}-collapse-${n}">
                                                <span>Q${n}.</span> ${f.q}
                                            </button>
                                        </h2>
                                        <div id="${s.faqIdPrefix}-collapse-${n}"
                                            class="accordion-collapse collapse${active ? ' show' : ''}"
                                            role="region"
                                            aria-labelledby="${s.faqIdPrefix}-heading-${n}"
                                            data-bs-parent="#${s.faqIdPrefix}-accordion">
                                            <div class="accordion-body">
                                                ${f.a}
                                            </div>
                                        </div>
                                    </div>`;
    })
    .join('\n');
  return `
            <!-- ==================== FAQ Start ==================== -->
            <section class="faq-two-area py-120">
                <div class="container tw-container-1800-px">
                    <div class="row">
                        <div class="col-xl-4">
                            <div class="faq-two-left h-100 d-flex justify-content-between flex-column">
                                <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                    <h2 class="faq-two-title tw-text-20 text-uppercase tw-char-animation">Quick Answers</h2>
                                </div>
                                <div class="faq-two-wrap d-inline-flex tw-gap-6 tw-rounded-lg" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                    <div class="faq-two-thumb">
                                        <img class="tw-rounded-lg" src="assets/images/thumbs/faq-two-thumb.jpg" alt="thumb">
                                    </div>
                                    <div class="faq-two-content tw-py-4 d-flex justify-content-between flex-column">
                                        <div>
                                            <h3 class="tw-text-xl">Maxwell Sterling</h3>
                                            <p>Co-Founder &amp; CTO</p>
                                        </div>
                                        <div class="faq-two-social">
                                            <ul class="d-flex tw-gap-205">
                                                <li><a class="tw-rounded-lg" href="#"><i class="ph-bold ph-facebook-logo"></i></a></li>
                                                <li><a class="tw-rounded-lg" href="#"><i class="ph-bold ph-x-logo"></i></a></li>
                                                <li><a class="tw-rounded-lg" href="#"><i class="ph-bold ph-dribbble-logo"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-8">
                            <div class="tw-custom-accordion" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                                <div class="accordion" id="${s.faqIdPrefix}-accordion">
${items}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- ==================== FAQ End ==================== -->
`;
}

function ctaSection(s) {
  return `
            <!-- ==================== CTA Start ==================== -->
            <section class="cta-two-area position-relative z-1 bg-img" data-background-image="assets/images/thumbs/cta-two-bg.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="section-wrapper text-center">
                                <h2 class="cta-two-title text-white tw-text-15 tw-itm-title tw-itm-anim">${s.ctaTitle}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div">
                    <img class="cta-two-shape-1 position-absolute z-1 start-0 top-0 tw-mt-18 tw-ms-18" src="assets/images/shapes/cta-two-shape1.png" alt="shape1">
                    <img class="cta-two-shape-2 position-absolute z-1 end-0 bottom-0 tw-mb-18 tw-me-18" src="assets/images/shapes/cta-two-shape2.png" alt="shape2">
                </div>
            </section>
`;
}

/* ------------------------------------------------------------------ */
/* Content model — one entry per service                               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    file: 'service-product-engineering.html',
    slug: 'product-engineering',
    navLabel: 'Product Engineering',
    metaTitle: 'Product Engineering Services | Mernify',
    metaDesc:
      'Mernify pairs senior engineers with product strategy to take your idea from architecture to a production-ready release, then stays on to help it scale.',
    metaKeywords: 'Product Engineering, MVP Development, Full-Stack Engineering, Technical Architecture, Mernify',
    heroEyebrow: 'Product Engineering',
    heroParagraph:
      'Senior engineering and product thinking, combined, to take you from a rough concept to a system your team can operate and scale &mdash; without a rewrite twelve months in.',
    heroImage: 'assets/images/thumbs/service-three-thumb1.png',
    heroTags: [
      'Discovery &amp; Architecture',
      'Full-Stack Delivery',
      'MVP Development',
      'Technical Ownership',
      'Cross-Functional Pods',
      'Scale-Ready Systems',
      'Code Ownership',
      'Production Launch',
    ],
    heroTitle: 'engineer for scale',
    parallaxImage: 'assets/images/thumbs/thumbnail-two-bg.jpg',
    overviewKicker: 'Why Product Engineering',
    overviewTitle:
      'One Accountable Team, From Architecture To <span class="text-main-two-600">Production</span>',
    overviewImage: 'assets/images/thumbs/about-thumb-one.jpg',
    overviewLead:
      'Fast-moving companies rarely stall for lack of ideas. They stall when engineering can&rsquo;t turn a roadmap into a system that holds up under real usage &mdash; and when a patchwork of freelancers and agencies leaves no one actually accountable for the outcome. Mernify replaces that patchwork with a single engineering partner who scopes, ships, and owns the release.',
    overviewPoints: [
      'Launch on production-grade foundations instead of throwaway MVP code',
      'Avoid the costly rewrite most fast-growing products hit within their first year',
      'Get architecture decisions made by engineers who will also live with them',
      'Scale the same codebase from first customer to enterprise workload',
    ],
    capabilitiesTitle: 'What Product Engineering Includes',
    capabilities: [
      { icon: 'ph-magnifying-glass', title: 'Discovery through architecture', desc: 'We turn business goals into a technical plan &mdash; data model, service boundaries, build-vs-buy calls &mdash; before the first sprint starts.' },
      { icon: 'ph-users-three', title: 'Cross-functional delivery pods', desc: 'Backend, frontend, QA, and product work from a single backlog, so decisions never wait on handoffs between separate vendors.' },
      { icon: 'ph-chart-line-up', title: 'MVP to scale roadmap', desc: 'We sequence what to build now and what to defer, so early speed never boxes in the version you will need at scale.' },
      { icon: 'ph-shield-check', title: 'Technical ownership after launch', desc: 'The team that shipped your product keeps monitoring, fixing, and extending it &mdash; institutional knowledge never walks out the door.' },
    ],
    processTitle: 'How We Deliver Product Engineering',
    process: [
      { title: 'Discovery &amp; Technical Audit', desc: 'We map your business requirements, existing systems, and constraints into a scoped architecture and a milestone-based delivery plan.' },
      { title: 'Architecture &amp; Sprint Planning', desc: 'Data models, service boundaries, and integration points are documented and reviewed with your stakeholders before development begins.' },
      { title: 'Iterative Build &amp; QA', desc: 'Two-week delivery cycles ship working software continuously, backed by automated testing and a staging environment from day one.' },
      { title: 'Launch &amp; Continuous Ownership', desc: 'We manage the production rollout and early live traffic, then transition into an ongoing engineering partnership.' },
    ],
    benefits: [
      { stat: '40%', title: 'Faster time-to-market', desc: 'Parallel discovery and build cycles get a scoped MVP into users&rsquo; hands in weeks, not two quarters.' },
      { stat: '0', title: 'Rewrites at scale', desc: 'Architecture is designed for your 10x scenario from day one, so growth doesn&rsquo;t force a rebuild.' },
      { stat: '100%', title: 'Codebase ownership', desc: 'Clean documentation, no proprietary lock-in &mdash; every repository and decision record stays yours.' },
    ],
    useCases: [
      { image: 'assets/images/thumbs/portfolio-thumb1.jpg', tag: 'Startup', title: 'A pre-seed MVP built for a Series A demo', desc: 'A founding team needed working software to close their raise. We scoped a lean MVP, shipped it in five weeks, and left them an architecture that didn&rsquo;t need rebuilding post-funding.' },
      { image: 'assets/images/thumbs/portfolio-thumb2.jpg', tag: 'Growth-Stage', title: 'Replacing a fragile freelance-built stack', desc: 'We audited an unstable codebase, re-architected the core data model, and migrated live customers over with zero unplanned downtime.' },
      { image: 'assets/images/thumbs/service-two-thumb1.jpg', tag: 'Enterprise', title: 'A new product line inside an existing platform', desc: 'We embedded with an internal team to design and ship a new module without disrupting the release cadence of the core product.' },
    ],
    faqIdPrefix: 'pe',
    faqs: [
      { q: 'What does a product engineering engagement typically include?', a: 'Discovery and technical scoping, architecture and data modeling, full-stack implementation, QA, and a production launch &mdash; followed by an option for ongoing ownership. You get one team accountable for the whole lifecycle, not a handoff between vendors.' },
      { q: 'How is this different from hiring a typical dev agency?', a: 'Most agencies staff a project team that disbands after launch. We stay structured around outcomes: the engineers who design your architecture are the same ones who ship it and support it in production, so context never gets lost in a handoff.' },
      { q: 'Do we own the code and infrastructure after launch?', a: 'Yes. Every repository, cloud account, and credential is provisioned under your organization from day one. There is no proprietary framework or lock-in &mdash; you can bring the work in-house at any time.' },
      { q: 'How long does it take to go from idea to a working product?', a: 'Most MVPs reach a demoable, production-grade release in three to six weeks after discovery, depending on scope. We sequence features so the highest-value workflows ship first.' },
      { q: 'Can you work alongside our existing in-house engineers?', a: 'Yes. We regularly embed inside existing teams to extend capacity, take ownership of a specific module, or lead architecture decisions while your team focuses on other priorities.' },
      { q: 'What happens after the initial build is complete?', a: 'Most clients move into a retained engineering arrangement covering monitoring, bug fixes, and new feature development, so the product keeps evolving without re-onboarding a new team.' },
    ],
    ctaTitle: 'Ready to turn your roadmap into <span class="text-main-two-600">production software</span>? Let&rsquo;s scope your first release together.',
  },

  {
    file: 'service-saas-development.html',
    slug: 'saas-development',
    navLabel: 'SaaS Development',
    metaTitle: 'SaaS Development Services | Mernify',
    metaDesc:
      'Mernify builds multi-tenant SaaS platforms with clean tenancy models, subscription billing, and admin tooling ready to scale from your first customer to your largest account.',
    metaKeywords: 'SaaS Development, Multi-Tenant Architecture, Subscription Billing, Admin Portals, Mernify',
    heroEyebrow: 'SaaS Development',
    heroParagraph:
      'Multi-tenant platforms with the data isolation, admin tooling, and release discipline that let you onboard customer 10 and customer 10,000 on the same codebase.',
    heroImage: 'assets/images/thumbs/service-three-thumb2.png',
    heroTags: [
      'Multi-Tenant Architecture',
      'Subscription Billing',
      'Admin Portals',
      'RBAC &amp; SSO',
      'Usage Metering',
      'Observability',
      'API Design',
      'Release Engineering',
    ],
    heroTitle: 'built for tenants',
    parallaxImage: 'assets/images/thumbs/thumbnail-bg.jpg',
    overviewKicker: 'Why SaaS Development',
    overviewTitle: 'Architecture Built For Tenants, Not Just <span class="text-main-two-600">Users</span>',
    overviewImage: 'assets/images/thumbs/portfolio-two-thumb1.jpg',
    overviewLead:
      'SaaS looks like a web app on the surface, but the hard problems live underneath: tenant isolation, role-based access, billing state machines, and an admin layer your support team actually trusts. We design the tenancy model, subscription logic, and observability layer before writing product features, so the platform you launch with is the same one you scale on.',
    overviewPoints: [
      'Onboard new tenants without manual provisioning or engineering involvement',
      'Give your support and success teams an admin system they can actually operate',
      'Launch with subscription billing logic that handles upgrades, downgrades, and dunning',
      'Avoid the &ldquo;re-architect for enterprise&rdquo; project most SaaS teams hit at scale',
    ],
    capabilitiesTitle: 'What SaaS Development Includes',
    capabilities: [
      { icon: 'ph-squares-four', title: 'Multi-tenant architecture', desc: 'Clean data isolation between tenants, designed to support single-tenant, pooled, or hybrid models as your customer base diversifies.' },
      { icon: 'ph-layout', title: 'Admin &amp; customer portals', desc: 'Internal tooling for your team and self-serve portals for your customers, built on the same permission model from day one.' },
      { icon: 'ph-credit-card', title: 'Subscription-ready foundations', desc: 'Plans, seats, usage metering, upgrades, downgrades, and failed-payment handling &mdash; modeled correctly before your first invoice goes out.' },
      { icon: 'ph-gauge', title: 'Observability &amp; release process', desc: 'Monitoring, alerting, and a deployment pipeline that lets you ship weekly without an outage becoming a support fire drill.' },
    ],
    processTitle: 'How We Deliver SaaS Development',
    process: [
      { title: 'Product &amp; Tenancy Discovery', desc: 'We define your tenant model, role structure, and billing logic before any code is written, so pricing changes don&rsquo;t mean re-architecture later.' },
      { title: 'Architecture &amp; Data Modeling', desc: 'Tenant isolation, RBAC, and integration points are designed and reviewed against your compliance and scale requirements.' },
      { title: 'Iterative Build &amp; Hardening', desc: 'Core workflows ship in two-week cycles, with security review and load testing built into the process, not bolted on afterward.' },
      { title: 'Launch, Observe &amp; Iterate', desc: 'We roll out to production with monitoring and alerting in place, then help you establish a release cadence your team can sustain.' },
    ],
    benefits: [
      { stat: '&lt;30 days', title: 'Faster tenant onboarding', desc: 'Self-serve provisioning means new customers activate without a single engineering ticket.' },
      { stat: '99.9%', title: 'Uptime-ready architecture', desc: 'Monitoring, redundancy, and rollback plans are part of the build, not an afterthought before your first enterprise deal.' },
      { stat: '1 codebase', title: 'Serving every tenant', desc: 'One well-architected platform scales from your first customer to your largest account without a fork.' },
    ],
    useCases: [
      { image: 'assets/images/thumbs/portfolio-thumb3.jpg', tag: 'Startup', title: 'A vertical SaaS MVP with billing from day one', desc: 'We shipped a multi-tenant core with subscription billing and an admin panel in under a month, so the founding team could start charging customers immediately.' },
      { image: 'assets/images/thumbs/service-two-thumb2.jpg', tag: 'Growth-Stage', title: 'Re-architecting for an enterprise tier', desc: 'We introduced SSO, granular roles, and audit logging to an existing platform without disrupting live tenants &mdash; unlocking a stalled enterprise pipeline.' },
      { image: 'assets/images/thumbs/portfolio-thumb4.jpg', tag: 'Enterprise', title: 'Consolidating three regional platforms into one', desc: 'We merged fragmented tenant data models into a single platform with regional data residency controls intact.' },
    ],
    faqIdPrefix: 'saas',
    faqs: [
      { q: 'What makes SaaS development different from a regular web app?', a: 'SaaS requires tenant isolation, subscription billing state, role-based access, and an admin layer your team can operate &mdash; none of which a typical marketing site or internal tool needs. Getting these wrong early usually means a costly re-architecture later.' },
      { q: 'Can you add multi-tenancy to an existing product?', a: 'Yes. We regularly retrofit tenancy, RBAC, and billing into products that started as single-customer builds, migrating live data without downtime for existing users.' },
      { q: 'Do you integrate with billing providers like Stripe?', a: 'Yes. We implement subscription plans, metered usage, upgrades and downgrades, and dunning logic using providers like Stripe, modeled correctly against your actual pricing structure.' },
      { q: 'How do you handle security and compliance requirements?', a: 'We build in audit logging, role-based access control, and data isolation from the start, and can architect toward frameworks like SOC 2 as your enterprise deals require it.' },
      { q: 'Will the platform support an enterprise tier later?', a: 'Yes &mdash; SSO, granular permissions, and usage-based limits are things we plan for in the initial architecture, even if you don&rsquo;t need them at launch, so adding them later doesn&rsquo;t mean a rebuild.' },
      { q: 'What ongoing support do you offer after launch?', a: 'Most SaaS clients retain us for release management, monitoring, and continued feature development, since a SaaS product is never really &ldquo;done&rdquo; &mdash; it evolves with every new customer segment.' },
    ],
    ctaTitle: 'Ready to build a SaaS platform that scales past your <span class="text-main-two-600">first hundred customers</span>? Let&rsquo;s design the foundation.',
  },

  {
    file: 'service-web-development.html',
    slug: 'web-development',
    navLabel: 'Web Development',
    metaTitle: 'Web Development Services | Mernify',
    metaDesc:
      'Mernify builds customer-facing and internal web applications engineered for performance, accessibility, and long-term maintainability from the first commit.',
    metaKeywords: 'Web Development, Performance Engineering, Accessibility, API Integration, Mernify',
    heroEyebrow: 'Web Development',
    heroParagraph:
      'Customer-facing and internal web applications engineered for performance, security, and long-term maintainability &mdash; not just a good-looking demo.',
    heroImage: 'assets/images/thumbs/service-three-thumb3.png',
    heroTags: [
      'Performance Engineering',
      'Accessible UI',
      'API Integration',
      'Headless CMS',
      'SEO Architecture',
      'Core Web Vitals',
      'Internal Portals',
      'Component Systems',
    ],
    heroTitle: 'platforms that perform',
    parallaxImage: 'assets/images/thumbs/thumbnail-ab-bg.jpg',
    overviewKicker: 'Why Web Development',
    overviewTitle: 'A Platform That Performs Under Real <span class="text-main-two-600">Traffic</span>',
    overviewImage: 'assets/images/thumbs/banner-two-thumb.jpg',
    overviewLead:
      'Most web projects are scoped around what the page looks like. Few are scoped around what happens when three thousand people load it at once, or when a customer using a screen reader tries to check out. We treat performance, accessibility, and API security as requirements, not polish &mdash; so the site you launch with holds up as traffic, content, and your team all grow.',
    overviewPoints: [
      'Ship pages that load fast on real-world connections, not just on a developer laptop',
      'Build on an architecture that supports both marketing content and logged-in product experiences',
      'Meet accessibility expectations without a separate remediation project later',
      'Integrate securely with the APIs and services your business already depends on',
    ],
    capabilitiesTitle: 'What Web Development Includes',
    capabilities: [
      { icon: 'ph-browsers', title: 'Customer &amp; internal portals', desc: 'Public-facing marketing sites and authenticated internal tools built on a shared, consistent component system.' },
      { icon: 'ph-lightning', title: 'Performance-focused frontends', desc: 'Code-splitting, image optimization, and caching strategy applied from the start, not retrofitted after a slow launch.' },
      { icon: 'ph-plug', title: 'Secure API integration', desc: 'Clean integration with payment providers, CRMs, and internal services, with authentication handled correctly by default.' },
      { icon: 'ph-eye', title: 'Accessibility-minded UI', desc: 'Semantic markup, keyboard navigation, and contrast standards built in, so accessibility isn&rsquo;t a last-minute audit fix.' },
    ],
    processTitle: 'How We Deliver Web Development',
    process: [
      { title: 'Content &amp; UX Discovery', desc: 'We map your key user journeys and content structure before design starts, so the sitemap serves real goals, not guesswork.' },
      { title: 'Design &amp; Frontend Architecture', desc: 'A component system and technical architecture are defined together, so design and engineering never drift out of sync.' },
      { title: 'Build, Integrate &amp; Optimize', desc: 'Pages are built with performance budgets in mind, integrated with your APIs, and tested across real devices.' },
      { title: 'Launch &amp; Performance Tuning', desc: 'We benchmark load times and Core Web Vitals post-launch and tune further based on real user data.' },
    ],
    benefits: [
      { stat: '&lt;2s', title: 'Load time targets', desc: 'Every build is measured against real-world performance budgets, not just a fast connection in a demo.' },
      { stat: '90+', title: 'Lighthouse performance scores', desc: 'Optimized assets and rendering strategy get you into the top performance tier search engines reward.' },
      { stat: '100%', title: 'Ownership of your codebase', desc: 'A clean, documented frontend your internal team &mdash; or ours &mdash; can extend without reverse-engineering it first.' },
    ],
    useCases: [
      { image: 'assets/images/thumbs/portfolio-two-thumb2.jpg', tag: 'Startup', title: 'A marketing site that converts and ranks', desc: 'We rebuilt a slow marketing site into a fast, SEO-structured platform, cutting load times significantly and lifting organic sign-ups within the first quarter.' },
      { image: 'assets/images/thumbs/portfolio-thumb5.jpg', tag: 'Growth-Stage', title: 'An internal portal replacing spreadsheets', desc: 'We replaced a manual, spreadsheet-driven workflow with an internal web application integrated directly into the team&rsquo;s existing systems.' },
      { image: 'assets/images/thumbs/portfolio-thumb6.jpg', tag: 'Enterprise', title: 'A component library unifying five product teams', desc: 'We built a shared design and component system so five separate teams could ship consistent web experiences without duplicating frontend work.' },
    ],
    faqIdPrefix: 'web',
    faqs: [
      { q: 'Do you build both marketing sites and web applications?', a: 'Yes. We work across both, and often on the same project &mdash; a fast public marketing site paired with a logged-in application, sharing one consistent design and technical foundation.' },
      { q: 'How do you approach page speed and Core Web Vitals?', a: 'Performance budgets are set during architecture, not measured after launch. We optimize assets, rendering strategy, and caching from the first sprint so speed isn&rsquo;t a retrofit.' },
      { q: 'Can you integrate with our existing CRM, payment provider, or internal tools?', a: 'Yes. Secure integration with third-party and internal APIs is a core part of most web builds, handled with proper authentication and error handling from day one.' },
      { q: 'Do you handle accessibility (WCAG) compliance?', a: 'We build with semantic markup, keyboard navigation, and contrast standards in place by default, and can scope a full audit against WCAG 2.1 AA if you need a compliance review.' },
      { q: 'Will the site be easy to update after launch?', a: 'Yes &mdash; we typically pair the build with a headless CMS or structured content model so your team can update copy and pages without engineering involvement for routine changes.' },
      { q: 'How do you handle hosting and ongoing maintenance?', a: 'We deploy to modern cloud infrastructure with CI/CD from day one, and most clients retain us afterward for monitoring, security patching, and continued feature work.' },
    ],
    ctaTitle: 'Ready for a web platform that&rsquo;s <span class="text-main-two-600">fast, secure, and built to grow</span>? Let&rsquo;s talk about your site.',
  },

  {
    file: 'service-mobile-app-development.html',
    slug: 'mobile-app-development',
    navLabel: 'Mobile App Development',
    metaTitle: 'Mobile App Development Services | Mernify',
    metaDesc:
      'Mernify builds cross-platform and native-quality mobile apps backed by solid APIs, thoughtful UX, and a release process ready for both app stores.',
    metaKeywords: 'Mobile App Development, React Native, Flutter, iOS, Android, Mernify',
    heroEyebrow: 'Mobile App Development',
    heroParagraph:
      'Cross-platform and native-quality mobile apps backed by solid APIs, thoughtful UX, and a release process ready for both app stores from day one.',
    heroImage: 'assets/images/thumbs/portfolio-two-thumb3.jpg',
    heroTags: [
      'iOS &amp; Android',
      'React Native',
      'Flutter',
      'Offline-First Sync',
      'Push Notifications',
      'App Store Launch',
      'Mobile APIs',
      'Native Modules',
    ],
    heroTitle: 'apps people keep',
    parallaxImage: 'assets/images/thumbs/service-details-bg1.jpg',
    overviewKicker: 'Why Mobile App Development',
    overviewTitle: 'Built For App Store Approval And Daily <span class="text-main-two-600">Use</span>',
    overviewImage: 'assets/images/thumbs/portfolio-two-thumb4.jpg',
    overviewLead:
      'A mobile app has to earn a permanent spot on someone&rsquo;s home screen, work reliably offline or on poor connections, and pass app store review without delays that stall your launch date. We architect mobile apps around real device conditions and store requirements from the start &mdash; not as problems to debug the week before submission.',
    overviewPoints: [
      'Launch on both iOS and Android from a single, well-architected codebase',
      'Avoid the app store rejection cycle that delays most first-time submissions',
      'Design offline-friendly, low-bandwidth behavior instead of bolting it on later',
      'Build a mobile API layer that scales independently of your web platform',
    ],
    capabilitiesTitle: 'What Mobile App Development Includes',
    capabilities: [
      { icon: 'ph-device-mobile', title: 'iOS &amp; Android delivery', desc: 'Apps designed and tested against real platform guidelines, not just simulator behavior, to reduce store review friction.' },
      { icon: 'ph-atom', title: 'React Native &amp; Flutter', desc: 'Cross-platform frameworks used where they fit, native modules used where performance or platform APIs demand it.' },
      { icon: 'ph-flow-arrow', title: 'Mobile API design', desc: 'Backend APIs designed for mobile constraints &mdash; payload size, offline sync, and versioning across app releases.' },
      { icon: 'ph-rocket-launch', title: 'Store submission support', desc: 'We handle App Store Connect and Google Play Console setup, metadata, and the review process end to end.' },
    ],
    processTitle: 'How We Deliver Mobile App Development',
    process: [
      { title: 'Platform &amp; Experience Discovery', desc: 'We define your core user flows and decide between cross-platform and native approaches based on your actual requirements.' },
      { title: 'UX &amp; Native Architecture Planning', desc: 'Screens, navigation, and offline behavior are designed and mapped to a technical architecture before development starts.' },
      { title: 'Build &amp; Device QA', desc: 'Features are built in sprints and tested across real iOS and Android devices, not just emulators.' },
      { title: 'Store Submission &amp; Launch Support', desc: 'We prepare store listings, manage the submission process, and monitor the first release for crashes and feedback.' },
    ],
    benefits: [
      { stat: '2 platforms', title: 'One shared codebase', desc: 'Cross-platform architecture cuts duplicate engineering effort without sacrificing native-feeling performance.' },
      { stat: '&lt;6 wks', title: 'To first store submission', desc: 'A focused MVP scope gets a real, installable app in front of app store review sooner.' },
      { stat: '4.5&#9733;', title: 'Target app store experience', desc: 'Performance, stability, and onboarding are treated as launch requirements, not post-launch fixes.' },
    ],
    useCases: [
      { image: 'assets/images/thumbs/home2.jpg', tag: 'Startup', title: 'A consumer app from concept to launch day', desc: 'We took a founder&rsquo;s sketch through UX design, cross-platform build, and both store submissions in under two months.' },
      { image: 'assets/images/thumbs/portfolio-thumb7.jpg', tag: 'Growth-Stage', title: 'Rebuilding a hybrid app for native performance', desc: 'We migrated a sluggish hybrid app to a React Native architecture with native modules, cutting crash rates and load times significantly.' },
      { image: 'assets/images/thumbs/portfolio-thumb8.jpg', tag: 'Enterprise', title: 'A field-service app built for offline use', desc: 'We designed offline-first data sync for field teams working in low-connectivity environments, with automatic reconciliation on reconnect.' },
    ],
    faqIdPrefix: 'mob',
    faqs: [
      { q: 'Should we build with React Native, Flutter, or native code?', a: 'It depends on your performance needs, existing team skills, and how platform-specific your UX has to be. We assess this during discovery rather than defaulting to one framework for every project.' },
      { q: 'Can one codebase really cover both iOS and Android well?', a: 'For most business apps, yes &mdash; cross-platform frameworks now deliver native-feeling performance for the majority of use cases, with native modules added only where a specific platform API requires it.' },
      { q: 'How do you handle App Store and Google Play submission?', a: 'We manage developer account setup, listing metadata, screenshots, and the review process itself, and handle any rejection feedback directly so it doesn&rsquo;t stall your launch.' },
      { q: 'What happens if the app needs to work offline?', a: 'We design local data storage and sync logic into the architecture from the start, including conflict resolution for when a device reconnects after being offline.' },
      { q: 'Do you build the backend API as well as the app?', a: 'Yes. Most mobile projects include a backend designed specifically for mobile constraints &mdash; smaller payloads, versioned endpoints, and push notification infrastructure.' },
      { q: 'What ongoing support is available after launch?', a: 'We offer retained support for OS updates, new device compatibility, crash monitoring, and continued feature releases, since mobile platforms change more often than most teams expect.' },
    ],
    ctaTitle: 'Ready to launch on <span class="text-main-two-600">iOS and Android</span> without duplicating your engineering effort? Let&rsquo;s scope your app.',
  },

  {
    file: 'service-ai-integration.html',
    slug: 'ai-integration',
    navLabel: 'AI Integration',
    metaTitle: 'AI Integration Services | Mernify',
    metaDesc:
      'Mernify integrates assistants, search, and model-powered features into real products with clear success metrics, evaluation, and guardrails from the start.',
    metaKeywords: 'AI Integration, RAG, LLM, Assistants, Evaluation, Mernify',
    heroEyebrow: 'AI Integration',
    heroParagraph:
      'Assistants, search, and model-powered features integrated into real products with clear success metrics, evaluation, and guardrails from the start.',
    heroImage: 'assets/images/thumbs/service-three-thumb4.png',
    heroTags: [
      'RAG &amp; Search',
      'Model Integration',
      'Assistant UX',
      'Evaluation Pipelines',
      'Guardrails &amp; Safety',
      'Prompt Engineering',
      'Vector Search',
      'Cost Optimization',
    ],
    heroTitle: 'ai that ships',
    parallaxImage: 'assets/images/thumbs/service-details-bg2.jpg',
    overviewKicker: 'Why AI Integration',
    overviewTitle: 'AI Features That Are Evaluated, Not Just <span class="text-main-two-600">Deployed</span>',
    overviewImage: 'assets/images/thumbs/feature-three-thumb1.jpg',
    overviewLead:
      'The gap between an impressive AI prototype and a reliable production feature is evaluation: knowing when the model is wrong, what it costs at scale, and what happens when it fails in front of a customer. We treat AI features as software with measurable requirements &mdash; accuracy targets, latency budgets, and guardrails &mdash; not as a black box bolted onto your product.',
    overviewPoints: [
      'Ship AI features with defined accuracy and latency targets, not just &ldquo;it feels smart&rdquo;',
      'Avoid unpredictable model costs by architecting usage and caching correctly upfront',
      'Keep sensitive data out of prompts sent to third-party model providers',
      'Build an evaluation pipeline so quality doesn&rsquo;t silently degrade after launch',
    ],
    capabilitiesTitle: 'What AI Integration Includes',
    capabilities: [
      { icon: 'ph-chat-circle-text', title: 'Product-embedded assistants', desc: 'Conversational features embedded directly into your existing product workflows, not a bolt-on chatbot in the corner.' },
      { icon: 'ph-magnifying-glass', title: 'Intelligent search &amp; RAG', desc: 'Retrieval-augmented pipelines that ground model responses in your own data, reducing hallucination and improving relevance.' },
      { icon: 'ph-plugs-connected', title: 'Model provider integrations', desc: 'Clean, swappable integration with providers like OpenAI, Anthropic, and open-weight models, avoiding hard lock-in.' },
      { icon: 'ph-shield-check', title: 'Evaluation &amp; guardrails', desc: 'Automated evaluation suites and safety guardrails that catch regressions and bad outputs before your users do.' },
    ],
    processTitle: 'How We Deliver AI Integration',
    process: [
      { title: 'Use-Case &amp; Data Discovery', desc: 'We identify where AI actually creates measurable value in your product and what data is available to ground it.' },
      { title: 'Model &amp; Architecture Selection', desc: 'We choose the right model provider, retrieval strategy, and cost profile for your specific use case and scale.' },
      { title: 'Prototype, Evaluate &amp; Guardrail', desc: 'We build an evaluation set early and iterate against it, adding guardrails for safety, cost, and failure handling.' },
      { title: 'Deploy &amp; Continuously Tune', desc: 'We ship to production with monitoring on quality and cost, then tune prompts and retrieval as real usage comes in.' },
    ],
    benefits: [
      { stat: '70%', title: 'Fewer repetitive support tickets', desc: 'Well-scoped assistants resolve common questions instantly, freeing your team for higher-value work.' },
      { stat: '&lt;200ms', title: 'Target assistant response latency', desc: 'Architecture accounts for real-world latency budgets, not just raw model response time in isolation.' },
      { stat: '100%', title: 'Evaluated before shipping', desc: 'Every AI feature ships against a defined evaluation set, not just a handful of manual spot-checks.' },
    ],
    useCases: [
      { image: 'assets/images/thumbs/coming-soon-img.png', tag: 'Startup', title: 'An in-product assistant that cut onboarding time', desc: 'We embedded a contextual assistant directly into the product&rsquo;s core workflow, reducing new-user time-to-value in the first weeks post-launch.' },
      { image: 'assets/images/thumbs/portfolio-thumb9.jpg', tag: 'Growth-Stage', title: 'Search that actually understands the question', desc: 'We replaced keyword search with a retrieval-augmented pipeline grounded in the customer&rsquo;s own knowledge base, sharply cutting &ldquo;no results&rdquo; searches.' },
      { image: 'assets/images/thumbs/service-two-thumb1.jpg', tag: 'Enterprise', title: 'A guardrailed assistant for a regulated workflow', desc: 'We built evaluation and guardrail layers around a customer-facing assistant to meet strict accuracy and compliance requirements before rollout.' },
    ],
    faqIdPrefix: 'ai',
    faqs: [
      { q: 'How do you decide if AI is the right solution for our use case?', a: 'We start with the business problem, not the model. If a simpler rules-based or search-based approach solves it more reliably and cheaply, we&rsquo;ll tell you that instead of defaulting to AI.' },
      { q: 'How do you prevent the AI from giving wrong or made-up answers?', a: 'We ground responses in your own data through retrieval-augmented generation, define an evaluation set to measure accuracy, and add guardrails that catch and handle low-confidence or out-of-scope responses.' },
      { q: 'Will our data be used to train third-party models?', a: 'We architect integrations to use provider APIs under data-use terms that keep your data out of model training, and can route sensitive workloads to private or self-hosted models where required.' },
      { q: 'How do you keep AI costs predictable at scale?', a: 'We model expected usage and cost per interaction during architecture, implement caching and rate limiting, and monitor spend in production so costs don&rsquo;t scale unpredictably with usage.' },
      { q: 'Can you integrate AI into our existing product instead of building something new?', a: 'Yes &mdash; most of our AI work is embedding features into existing products, integrating with your current data model, authentication, and UI rather than shipping a separate standalone tool.' },
      { q: 'How do you measure whether the AI feature is actually working?', a: 'We define success metrics upfront &mdash; accuracy, latency, deflection rate, or task completion &mdash; and build a continuous evaluation pipeline so you can see quality trends, not just anecdotal feedback.' },
    ],
    ctaTitle: 'Ready to ship AI features that hold up in <span class="text-main-two-600">production</span>, not just in a demo? Let&rsquo;s scope the use case.',
  },

  {
    file: 'service-ui-ux-design.html',
    slug: 'ui-ux-design',
    navLabel: 'UI/UX Design',
    metaTitle: 'UI/UX Design Services | Mernify',
    metaDesc:
      'Mernify designs product experiences through research, wireframing, and interactive prototypes, so engineering starts with the hard decisions already made and tested.',
    metaKeywords: 'UI/UX Design, Product Design, Wireframing, Prototyping, Design Systems, Mernify',
    heroEyebrow: 'UI/UX Design',
    heroParagraph:
      'Product experiences designed through research, wireframing, and interactive prototypes, so by the time engineering starts, the hard decisions are already made and tested.',
    heroImage: 'assets/images/thumbs/about-thumb-two.jpg',
    heroTags: [
      'Discovery Workshops',
      'User Flows',
      'Wireframing',
      'Design Systems',
      'Prototyping',
      'Usability Testing',
      'Accessibility',
      'Design Handoff',
    ],
    heroTitle: 'design before code',
    parallaxImage: 'assets/images/thumbs/thumbnail-two-bg.jpg',
    overviewKicker: 'Why UI/UX Design',
    overviewTitle: 'A Buildable System, Not Just A Pretty <span class="text-main-two-600">Mockup</span>',
    overviewImage: 'assets/images/thumbs/portfolio-three-thumb1.jpg',
    overviewLead:
      'A beautiful static mockup that hasn&rsquo;t been tested against real user flows is a liability disguised as progress &mdash; it looks finished, but the hard questions about edge cases and usability haven&rsquo;t actually been answered. We design with engineering handoff in mind from the start: consistent components, documented states, and prototypes tested with real users before a single line of production code is written.',
    overviewPoints: [
      'Catch usability problems in a prototype, not three sprints into development',
      'Give engineering a component system instead of one-off screens to interpret',
      'Validate flows with real users before committing build time to them',
      'Reduce design-to-development rework caused by undocumented edge cases',
    ],
    capabilitiesTitle: 'What UI/UX Design Includes',
    capabilities: [
      { icon: 'ph-lightbulb', title: 'Discovery workshops', desc: 'Structured sessions with your stakeholders to align on goals, constraints, and success criteria before design work begins.' },
      { icon: 'ph-flow-arrow', title: 'User flows &amp; wireframes', desc: 'Low-fidelity flows that map every path a user can take, catching structural problems while they&rsquo;re still cheap to fix.' },
      { icon: 'ph-palette', title: 'High-fidelity UI systems', desc: 'A documented component library and visual system that keeps every screen consistent as the product grows.' },
      { icon: 'ph-cursor-click', title: 'Interactive prototypes', desc: 'Clickable prototypes tested with real users, so feedback comes before development, not after.' },
    ],
    processTitle: 'How We Deliver UI/UX Design',
    process: [
      { title: 'Discovery &amp; Research', desc: 'We align with stakeholders and, where useful, talk to real users to understand goals, constraints, and pain points.' },
      { title: 'Flows &amp; Wireframing', desc: 'We map every core user journey in low-fidelity wireframes, resolving structural issues before visual design begins.' },
      { title: 'Visual Design System', desc: 'We build a documented UI system &mdash; components, states, and patterns &mdash; so the product scales visually without drift.' },
      { title: 'Prototype &amp; Handoff', desc: 'We deliver tested, interactive prototypes and developer-ready specs, so engineering can build with confidence.' },
    ],
    benefits: [
      { stat: '2x', title: 'Faster stakeholder sign-off', desc: 'Interactive prototypes get consensus faster than static mockups and endless comment threads.' },
      { stat: '1 system', title: 'Powering every screen', desc: 'A single documented design system keeps new features visually and behaviorally consistent.' },
      { stat: '0', title: 'Guesswork handed to engineering', desc: 'Every state, edge case, and interaction is documented before development starts, not improvised mid-sprint.' },
    ],
    useCases: [
      { image: 'assets/images/thumbs/about-three-thumb.jpg', tag: 'Startup', title: 'A design system built before the first feature', desc: 'We designed a full component library ahead of development, letting the engineering team ship new screens consistently from week one.' },
      { image: 'assets/images/thumbs/portfolio-three-thumb2.jpg', tag: 'Growth-Stage', title: 'Redesigning a flow that was quietly losing users', desc: 'User research uncovered a confusing onboarding step; a redesigned flow, tested before build, measurably improved completion rates post-launch.' },
      { image: 'assets/images/thumbs/portfolio-three-thumb3.jpg', tag: 'Enterprise', title: 'Unifying UX across four internal tools', desc: 'We designed a shared pattern library so four previously inconsistent internal tools could adopt one predictable user experience.' },
    ],
    faqIdPrefix: 'ux',
    faqs: [
      { q: 'Do you design the product, or just individual screens?', a: 'We design at the system level &mdash; flows, components, and states &mdash; not just isolated screens. That&rsquo;s what lets engineering build consistently as the product grows beyond the initial scope.' },
      { q: 'Will you test designs with real users before development starts?', a: 'Where useful, yes. We build interactive prototypes and run usability sessions to catch confusing flows before they become expensive to fix in code.' },
      { q: 'Can you work from our existing brand guidelines?', a: 'Yes. We adapt to existing brand systems where one exists, or help establish one during the design phase if you&rsquo;re starting fresh.' },
      { q: 'Do you hand off designs in a format engineering can actually use?', a: 'Yes &mdash; we deliver documented Figma files with components, states, and specs, and can work directly alongside your engineering team (or ours) through implementation.' },
      { q: 'How do you handle accessibility in your designs?', a: 'Contrast ratios, keyboard navigation, and semantic structure are considered during design, not left as a post-launch accessibility audit fix.' },
      { q: 'Can UI/UX design be bundled with the engineering build?', a: 'Yes &mdash; most clients pair design with our product engineering or web development services, so the same team that designs the experience also ships it.' },
    ],
    ctaTitle: 'Ready to design a product experience your <span class="text-main-two-600">users and engineers</span> both trust? Let&rsquo;s start with discovery.',
  },
];

/* ------------------------------------------------------------------ */
/* Build + write                                                       */
/* ------------------------------------------------------------------ */

function buildPage(s, index) {
  const head = HEAD(s.metaTitle, s.metaDesc, s.metaKeywords);
  const brandHeading = `Technology &amp; Tools Behind <span class="text-main-two-600">${s.navLabel}</span>`;
  const body = [
    heroSection(s),
    overviewSection(s),
    capabilitiesSection(s),
    processSection(s),
    benefitsSection(s),
    brandArea(index, brandHeading),
    useCasesSection(s),
    faqSection(s),
    ctaSection(s),
  ].join('\n');
  return head + body + FOOTER_AND_SCRIPTS;
}

function writeFile(targetDir, filename, contents) {
  fs.writeFileSync(path.join(targetDir, filename), contents, 'utf8');
}

const written = [];

SERVICES.forEach((s, i) => {
  const html = buildPage(s, i);
  writeFile(ROOT, s.file, html);
  written.push(path.join(ROOT, s.file));
  if (HAS_MIRROR) {
    writeFile(MIRROR, s.file, html);
    written.push(path.join(MIRROR, s.file));
  }
});

console.log(`Generated ${SERVICES.length} service pages.`);
written.forEach((f) => console.log(' -', f));
