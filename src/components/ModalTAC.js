import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ModalTAC(props) {
    return (
        <Modal dialogClassName="tac-modal" show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Terms and conditions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>Terms and conditions</h1>
                <p>These terms and conditions (&#8220;Agreement&#8221;) set forth the general terms and conditions of your use of the <a href="https://trp-developement.web.app">trp-developement.web.app</a> website (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its related products and services (collectively, &#8220;Services&#8221;). This Agreement is legally binding between you (&#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;) and The Rainbow Project (&#8220;The Rainbow Project&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or &#8220;our&#8221;). If you are entering into this agreement on behalf of a business or other legal entity, you represent that you have the authority to bind such entity to this agreement, in which case the terms &#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221; shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this agreement, you must not accept this agreement and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. You acknowledge that this Agreement is a contract between you and The Rainbow Project, even though it is electronic and is not physically signed by you, and it governs your use of the Website and Services.</p>
                <div className="wpembed-toc"><h3>Table of contents</h3><ol className="wpembed-toc"><li><a href="#accounts-and-membership">Accounts and membership</a></li><li><a href="#links-to-other-resources">Links to other resources</a></li><li><a href="#intellectual-property-rights">Intellectual property rights</a></li><li><a href="#limitation-of-liability">Limitation of liability</a></li><li><a href="#changes-and-amendments">Changes and amendments</a></li><li><a href="#acceptance-of-these-terms">Acceptance of these terms</a></li><li><a href="#contacting-us">Contacting us</a></li></ol></div><h2 id="accounts-and-membership">Accounts and membership</h2>
                <p>You must be at least 18 years of age to use the Website and Services. By using the Website and Services and by agreeing to this Agreement you warrant and represent that you are at least 18 years of age. If you create an account on the Website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account and any other actions taken in connection with it. We may, but have no obligation to, monitor and review new accounts before you may sign in and start using the Services. Providing false contact information of any kind may result in the termination of your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions. We may suspend, disable, or delete your account (or any part thereof) if we determine that you have violated any provision of this Agreement or that your conduct or content would tend to damage our reputation and goodwill. If we delete your account for the foregoing reasons, you may not re-register for our Services. We may block your email address and Internet protocol address to prevent further registration.</p>
                <h2 id="links-to-other-resources">Links to other resources</h2>
                <p>Although the Website and Services may link to other resources (such as websites, mobile applications, etc.), we are not, directly or indirectly, implying any approval, association, sponsorship, endorsement, or affiliation with any linked resource, unless specifically stated herein. We are not responsible for examining or evaluating, and we do not warrant the offerings of, any businesses or individuals or the content of their resources. We do not assume any responsibility or liability for the actions, products, services, and content of any other third parties. You should carefully review the legal statements and other conditions of use of any resource which you access through a link on the Website. Your linking to any other off-site resources is at your own risk.</p>
                <h2 id="intellectual-property-rights">Intellectual property rights</h2>
                <p>&#8220;Intellectual Property Rights&#8221; means all present and future rights conferred by statute, common law or equity in or in relation to any copyright and related rights, trademarks, designs, patents, inventions, goodwill and the right to sue for passing off, rights to inventions, rights to use, and all other intellectual property rights, in each case whether registered or unregistered and including all applications and rights to apply for and be granted, rights to claim priority from, such rights and all similar or equivalent rights or forms of protection and any other results of intellectual activity which subsist or will subsist now or in the future in any part of the world. This Agreement does not transfer to you any intellectual property owned by The Rainbow Project or third parties, and all rights, titles, and interests in and to such property will remain (as between the parties) solely with The Rainbow Project. All trademarks, service marks, graphics and logos used in connection with the Website and Services, are trademarks or registered trademarks of The Rainbow Project or its licensors. Other trademarks, service marks, graphics and logos used in connection with the Website and Services may be the trademarks of other third parties. Your use of the Website and Services grants you no right or license to reproduce or otherwise use any of The Rainbow Project or third party trademarks.</p>
                <h2 id="limitation-of-liability">Limitation of liability</h2>
                <p>To the fullest extent permitted by applicable law, in no event will The Rainbow Project, its affiliates, directors, officers, employees, agents, suppliers or licensors be liable to any person for any indirect, incidental, special, punitive, cover or consequential damages (including, without limitation, damages for lost profits, revenue, sales, goodwill, use of content, impact on business, business interruption, loss of anticipated savings, loss of business opportunity) however caused, under any theory of liability, including, without limitation, contract, tort, warranty, breach of statutory duty, negligence or otherwise, even if the liable party has been advised as to the possibility of such damages or could have foreseen such damages. To the maximum extent permitted by applicable law, the aggregate liability of The Rainbow Project and its affiliates, officers, employees, agents, suppliers and licensors relating to the services will be limited to an amount no greater than one pound or any amounts actually paid in cash by you to The Rainbow Project for the prior one month period prior to the first event or occurrence giving rise to such liability. The limitations and exclusions also apply if this remedy does not fully compensate you for any losses or fails of its essential purpose.</p>
                <h2 id="changes-and-amendments">Changes and amendments</h2>
                <p>We reserve the right to modify this Agreement or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways at our discretion, such as through the contact information you have provided.</p>
                <p>An updated version of this Agreement will be effective immediately upon the posting of the revised Agreement unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Agreement (or such other act specified at that time) will constitute your consent to those changes.</p>
                <h2 id="acceptance-of-these-terms">Acceptance of these terms</h2>
                <p>You acknowledge that you have read this Agreement and agree to all its terms and conditions. By accessing and using the Website and Services you agree to be bound by this Agreement. If you do not agree to abide by the terms of this Agreement, you are not authorized to access or use the Website and Services. This terms and conditions policy was created with the help of <a href="https://www.websitepolicies.com" target="_blank" rel="noreferrer">WebsitePolicies</a>.</p>
                <h2 id="contacting-us">Contacting us</h2>
                <p>If you have any questions, concerns, or complaints regarding this Agreement, we encourage you to contact us using the details below:</p>
                <p><a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;G&#97;&#118;i&#110;&#100;&#97;&#118;&#101;&#64;&#72;&#111;tm&#97;il.co&#109;">Ga&#118;&#105;&#110;&#100;&#97;&#118;e&#64;&#72;o&#116;&#109;a&#105;&#108;&#46;com</a></p>
                <p>This document was last updated on March 16, 2023</p>
                <p className="madewith"><a href="https://www.websitepolicies.com/?via=madewithbadge" target="_blank" rel="noreferrer"><img width="200" height="25" alt="Made with WebsitePolicies" src="https://cdn.websitepolicies.io/img/badge.png" srcSet="https://cdn.websitepolicies.io/img/badge_2x.png 2x"></img></a></p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.updateFunction}>
                    Agree
                </Button>
                <Button variant="secondary" onClick={props.close}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

    )
}
