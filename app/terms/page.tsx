"use client";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            AD Revenue
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Effective: December 17, 2025</p>
          </div>

          <Card className="p-8 space-y-8">
            {/* Introduction */}
            <section className="space-y-4">
              <p className="text-foreground leading-relaxed">
                These Terms and Conditions ("Terms") are entered into by and between you and AD Revenue ("Company", "we", or "us"). 
                The following terms and conditions govern your access to and use of our platform, including any content, features, 
                and services offered on or through our website and mobile applications (collectively, "Platform").
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE PLATFORM. BY USING THE PLATFORM OR BY CLICKING TO ACCEPT 
                OR AGREE TO THE TERMS WHEN THIS OPTION IS MADE AVAILABLE TO YOU, YOU ACCEPT AND AGREE TO BE BOUND BY THESE 
                TERMS AND OUR PRIVACY POLICY. If you do not agree to these Terms or the Privacy Policy, you must not access 
                or use the Platform.
              </p>
            </section>

            <Separator />

            {/* Table of Contents */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">Table of Contents</h2>
              <ol className="list-decimal list-inside space-y-2 text-primary">
                <li><a href="#acceptance" className="hover:underline">Acceptance of Terms</a></li>
                <li><a href="#eligibility" className="hover:underline">Eligibility</a></li>
                <li><a href="#changes" className="hover:underline">Changes to Terms</a></li>
                <li><a href="#access" className="hover:underline">Access and Use of Platform</a></li>
                <li><a href="#rewards" className="hover:underline">Rewards Program</a></li>
                <li><a href="#earning" className="hover:underline">Earning Rewards</a></li>
                <li><a href="#redeeming" className="hover:underline">Redeeming Rewards</a></li>
                <li><a href="#account" className="hover:underline">Your Account</a></li>
                <li><a href="#prohibited" className="hover:underline">Prohibited Uses</a></li>
                <li><a href="#termination" className="hover:underline">Termination</a></li>
                <li><a href="#intellectual" className="hover:underline">Intellectual Property</a></li>
                <li><a href="#disclaimer" className="hover:underline">Disclaimer of Warranties</a></li>
                <li><a href="#limitation" className="hover:underline">Limitation of Liability</a></li>
                <li><a href="#governing" className="hover:underline">Governing Law</a></li>
                <li><a href="#contact" className="hover:underline">Contact Information</a></li>
              </ol>
            </section>

            <Separator />

            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
              <p className="text-foreground leading-relaxed">
                By accessing or using our Platform, you acknowledge that you have read, understood, and agree to be bound by 
                these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you 
                are prohibited from using or accessing this Platform.
              </p>
            </section>

            <Separator />

            {/* 2. Eligibility */}
            <section id="eligibility" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">2. Eligibility</h2>
              <p className="text-foreground leading-relaxed">
                This Platform is offered and available to users who are at least 18 years of age or older. By using this 
                Platform, you represent and warrant that you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Are at least 18 years old and of legal age to form a binding contract</li>
                <li>Have the legal capacity to agree to these Terms</li>
                <li>Are not prohibited from using the Platform under applicable laws</li>
              </ul>
              <p className="text-foreground leading-relaxed font-semibold">
                Participation is limited to one (1) account per person and one (1) account per household.
              </p>
            </section>

            <Separator />

            {/* 3. Changes to Terms */}
            <section id="changes" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Changes to Terms</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right to revise and update these Terms from time to time at our sole discretion. All changes 
                are effective immediately when posted and apply to all access to and use of the Platform thereafter. Your 
                continued use of the Platform following the posting of revised Terms means that you accept and agree to the 
                changes. You are expected to check this page regularly to stay informed of any updates.
              </p>
            </section>

            <Separator />

            {/* 4. Access and Use */}
            <section id="access" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">4. Access and Use of Platform</h2>
              <p className="text-foreground leading-relaxed">
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access 
                and use the Platform for personal, non-commercial purposes. You agree to use the Platform only for lawful 
                purposes and in accordance with these Terms and any applicable laws and regulations.
              </p>
              <p className="text-foreground leading-relaxed">
                We reserve the right to withdraw or amend the Platform, and any service or material we provide, in our sole 
                discretion without notice. We will not be liable if for any reason all or any part of the Platform is 
                unavailable at any time or for any period.
              </p>
            </section>

            <Separator />

            {/* 5. Rewards Program */}
            <section id="rewards" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">5. Rewards Program</h2>
              <p className="text-foreground leading-relaxed">
                We offer a rewards program where you can earn points or credits ("Rewards") by watching advertisements and 
                completing various activities on the Platform. Key terms include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Rewards have no cash or monetary value and cannot be transferred or sold</li>
                <li>Rewards can only be redeemed for prizes, gift cards, or other redemption options we offer</li>
                <li>We reserve the right to modify, suspend, or discontinue the rewards program at any time</li>
                <li>Rewards may expire if your account remains inactive for an extended period</li>
                <li>We may set minimum thresholds for reward redemption</li>
              </ul>
            </section>

            <Separator />

            {/* 6. Earning Rewards */}
            <section id="earning" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">6. Earning Rewards</h2>
              <p className="text-foreground leading-relaxed">
                You can earn Rewards by:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Watching video advertisements in their entirety</li>
                <li>Completing surveys and offers from our partners</li>
                <li>Participating in promotional activities</li>
                <li>Referring friends to the Platform (if applicable)</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                Rewards will be credited to your account after you complete the required activity. Processing times may vary. 
                We reserve the right to verify all activities and withhold or revoke Rewards if we suspect fraudulent behavior.
              </p>
            </section>

            <Separator />

            {/* 7. Redeeming Rewards */}
            <section id="redeeming" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">7. Redeeming Rewards</h2>
              <p className="text-foreground leading-relaxed">
                When you have accumulated sufficient Rewards, you may redeem them for available prizes such as gift cards, 
                PayPal transfers, or other options. Redemption is subject to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Meeting minimum balance requirements</li>
                <li>Verification of your identity and eligibility</li>
                <li>Availability of redemption options</li>
                <li>Compliance with these Terms</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                Redemption processing times vary depending on the method chosen. We are not responsible for delays caused 
                by third-party payment processors or gift card providers.
              </p>
            </section>

            <Separator />

            {/* 8. Your Account */}
            <section id="account" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">8. Your Account</h2>
              <p className="text-foreground leading-relaxed">
                To access certain features of the Platform, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your information to keep it accurate and current</li>
                <li>Keep your password confidential and secure</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Not share your account with others or allow others to access it</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                You are responsible for all activities that occur under your account. We reserve the right to disable any 
                account at any time if we believe you have violated these Terms.
              </p>
            </section>

            <Separator />

            {/* 9. Prohibited Uses */}
            <section id="prohibited" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">9. Prohibited Uses</h2>
              <p className="text-foreground leading-relaxed">
                You agree NOT to use the Platform to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Engage in fraudulent activities, including creating multiple accounts or using bots</li>
                <li>Use automated tools, scripts, bots, or macros to simulate human activity</li>
                <li>Manipulate or attempt to manipulate the rewards system</li>
                <li>Provide false or misleading information</li>
                <li>Interfere with or disrupt the Platform or servers</li>
                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                <li>Impersonate another person or entity</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Use the Platform for any commercial purpose without our permission</li>
              </ul>
              <p className="text-foreground leading-relaxed font-semibold">
                Violation of these prohibited uses may result in immediate account termination and forfeiture of all Rewards.
              </p>
            </section>

            <Separator />

            {/* 10. Termination */}
            <section id="termination" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">10. Termination</h2>
              <p className="text-foreground leading-relaxed">
                We reserve the right to terminate or suspend your account and access to the Platform immediately, without 
                prior notice or liability, for any reason, including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Breach of these Terms</li>
                <li>Fraudulent or suspicious activity</li>
                <li>Violation of applicable laws</li>
                <li>At our sole discretion</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                Upon termination, your right to use the Platform will immediately cease, and any unredeemed Rewards may be 
                forfeited. You may also terminate your account at any time by contacting us.
              </p>
            </section>

            <Separator />

            {/* 11. Intellectual Property */}
            <section id="intellectual" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">11. Intellectual Property Rights</h2>
              <p className="text-foreground leading-relaxed">
                The Platform and its entire contents, features, and functionality (including but not limited to all information, 
                software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are 
                owned by us, our licensors, or other providers of such material and are protected by copyright, trademark, 
                patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-foreground leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
                republish, download, store, or transmit any of the material on our Platform without our prior written consent.
              </p>
            </section>

            <Separator />

            {/* 12. Disclaimer */}
            <section id="disclaimer" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">12. Disclaimer of Warranties</h2>
              <p className="text-foreground leading-relaxed">
                THE PLATFORM IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER 
                EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>The Platform will be uninterrupted, secure, or error-free</li>
                <li>The results obtained from using the Platform will be accurate or reliable</li>
                <li>Any errors in the Platform will be corrected</li>
                <li>The Platform will meet your requirements</li>
              </ul>
              <p className="text-foreground leading-relaxed">
                Your use of the Platform is at your sole risk. We disclaim all warranties, express or implied, including 
                warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </section>

            <Separator />

            {/* 13. Limitation of Liability */}
            <section id="limitation" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">13. Limitation of Liability</h2>
              <p className="text-foreground leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, 
                OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES RESULTING FROM:
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                <li>Your access to or use of or inability to access or use the Platform</li>
                <li>Any conduct or content of any third party on the Platform</li>
                <li>Any content obtained from the Platform</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <Separator />

            {/* 14. Governing Law */}
            <section id="governing" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">14. Governing Law and Jurisdiction</h2>
              <p className="text-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we 
                operate, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use 
                of the Platform shall be resolved in the courts of that jurisdiction.
              </p>
            </section>

            <Separator />

            {/* 15. Contact */}
            <section id="contact" className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">15. Contact Information</h2>
              <p className="text-foreground leading-relaxed">
                If you have any questions, concerns, or comments about these Terms, please contact us at:
              </p>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-foreground"><strong>Email:</strong> support@adrevenue.com</p>
                <p className="text-foreground"><strong>Address:</strong> [Your Company Address]</p>
              </div>
            </section>

            <Separator />

            {/* Footer Note */}
            <section className="text-center space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                By using AD Revenue, you acknowledge that you have read and understood these Terms and Conditions 
                and agree to be bound by them.
              </p>
              <Link href="/" className="inline-block text-primary hover:underline font-semibold">
                Return to Home
              </Link>
            </section>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AD Revenue. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/terms" className="hover:text-primary">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
