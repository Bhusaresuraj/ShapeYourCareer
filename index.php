<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shape Your Career - Industry-Ready Programs</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="icon" type="image/x-icon" href="images/favicon.ico">
</head>
<?php include 'navbar.php' ?>

<section class="hero aviation-hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Shape Your Career with Industry-Ready Programs</h1>
                <p>Choose from expert-designed career paths in Aviation, Animation, and IT</p>
            </div>
            <div class="hero-form-card home-form-card unique-home-form">
                <form action="https://formspree.io/f/xdkggeer" method="POST" class="unique-hero-form" autocomplete="off">
                    <div class="form-row country-phone-row">
                        <div class="form-group country-phone">
                            <select name="country_code" id="home-country-code" required aria-label="Country Code">
                                <option value="+91" selected>🇮🇳 +91 India</option>
                                <option value="+1">🇺🇸 +1 USA</option>
                                <option value="+44">🇬🇧 +44 UK</option>
                                <option value="+61">🇦🇺 +61 AUS</option>
                                <option value="+971">🇦🇪 +971 UAE</option>
                            </select>
                            <input type="tel" name="mobile" id="home-mobile" pattern="[0-9]{10}" maxlength="10" required placeholder="Enter 10-digit number">
                        </div>
                    </div>
                    <button type="submit" class="cta-button big-cta home-cta unique-gradient-btn">
                        Book Free Consultation
                    </button>
                    <div class="form-trust-text">
                        <i class="fas fa-lock"></i> 100% privacy. No spam. We'll contact you only for your career.
                    </div>
                </form>
            </div>
        </div>
    </section>

<?php include 'footer.php' ?>

