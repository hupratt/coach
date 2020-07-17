import React from "react";
import { Link } from "react-router-dom";
import { BASE } from "../actions/api";

const TermsOfUse = () => {
  return (
    <>
      <Link to="/" style={{ zIndex: 1, position: "relative" }}>
        <img
          className="home-icon"
          src={`${BASE}/static/frontend/images/long-arrow-pointing-to-left-white.svg`}
          width="60px"
          height="60px"
          alt="Home"
        />
      </Link>
      <div style={{ marginTop: "150px" }} className="container">
        <strong>Terms &amp; Conditions</strong>
        <p>
          By downloading or using the app, these terms will automatically apply
          to you – you should make sure therefore that you read them carefully
          before using the app. You’re not allowed to copy, or modify the app,
          any part of the app, or our trademarks in any way. You’re not allowed
          to attempt to extract the source code of the app, and you also
          shouldn’t try to translate the app into other languages, or make
          derivative versions. The app itself, and all the trade marks,
          copyright, database rights and other intellectual property rights
          related to it, still belong to La petite portugaise ASBL.
        </p>
        <p>
          Craft Studios is committed to ensuring that the app is as useful and
          efficient as possible. For that reason, we reserve the right to make
          changes to the app or to charge for its services, at any time and for
          any reason. We will never charge you for the app or its services
          without making it very clear to you exactly what you’re paying for.
        </p>
        <p>
          Coach app stores and processes personal data that you have provided to
          us, in order to provide our Service. It’s your responsibility to keep
          your device and access to the app secure. We therefore recommend that
          you do not jailbreak or root your device, which is the process of
          removing software restrictions and limitations imposed by the official
          operating system of your device. It could make your device vulnerable
          to malware/viruses/malicious programs, compromise your device’s
          security features and it could mean that the Coach app won’t work
          properly or at all.
        </p>
        <p>
          You should be aware that there are certain things that Craft Studios
          will not take responsibility for. Certain functions of the app will
          require the app to have an active internet connection. The connection
          can be Wi-Fi, or provided by your mobile network provider, but Craft
          Studios cannot take responsibility for the app not working at full
          functionality if you don’t have access to Wi-Fi, and you don’t have
          any of your data allowance left.
        </p>
        <p>
          If you’re using the app outside of an area with Wi-Fi, you should
          remember that your terms of the agreement with your mobile network
          provider will still apply. As a result, you may be charged by your
          mobile provider for the cost of data for the duration of the
          connection while accessing the app, or other third party charges. In
          using the app, you’re accepting responsibility for any such charges,
          including roaming data charges if you use the app outside of your home
          territory (i.e. region or country) without turning off data roaming.
          If you are not the bill payer for the device on which you’re using the
          app, please be aware that we assume that you have received permission
          from the bill payer for using the app.
        </p>
        <p>
          Along the same lines, Craft Studios cannot take responsibility for the
          way you use the app i.e. You need to make sure that your device stays
          charged – if it runs out of battery and you can’t turn it on to avail
          the Service, Craft Studios cannot take responsibility.
        </p>
        <p>
          When you’re using the app, it’s important to bear in mind that
          although we endeavour to ensure that it is updated and correct at all
          times, we do rely on third parties to provide information to us so
          that we can make it available to you. Craft Studios accepts no
          liability for any loss, direct or indirect, you experience as a result
          of relying wholly on this functionality of the app.
        </p>
        <p>
          Craft Studios does not promise that it will always update the app so
          that it is relevant to you and/or works with your browser version. We
          may also wish to stop providing the app, and may terminate use of it
          at any time without giving notice of termination. Upon any
          termination, (a) the rights and licenses granted to you in these terms
          will end; (b) you must stop using the app, and (if needed) delete it
          from your device.
        </p>
        <p>
          <strong>Changes to This Terms and Conditions</strong>
        </p>
        <p>
          we may update our Terms and Conditions from time to time. Thus, you
          are advised to review this page periodically for any changes. we will
          notify you of any changes by posting the new Terms and Conditions on
          this page.
        </p>
        <p>These terms and conditions are effective as of 2020-05-07</p>
        <p>
          <strong>Contact Us</strong>
        </p>
        <p>
          If you have any questions or suggestions about our Terms and
          Conditions, do not hesitate to contact us at
          admin@lapetiteportugaise.com .
        </p>
      </div>
    </>
  );
};

export default TermsOfUse;
