// ==UserScript==
// @name         GitHub PR - Require Commit Email Selection
// @namespace    https://klaska.net
// @version      1.0
// @description  Makes the "Commit email" dropdown default to empty and required on GitHub PR merge forms
// @author       Radim Klaška
// @match        https://github.com/*/*/pull/*
// @grant        none
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/radimklaska/github_force_email_select/main/github_force_email_select.user.js
// @updateURL    https://raw.githubusercontent.com/radimklaska/github_force_email_select/main/github_force_email_select.user.js
// ==/UserScript==

(function() {
    'use strict';

    const POLL_INTERVAL = 500;
    const MAX_ATTEMPTS = 60; // 30 seconds max

    function modifyCommitEmailDropdown() {
        const select = document.querySelector('select[aria-label="Select commit author email"]');

        if (!select) {
            return false;
        }

        // Check if we've already modified this select
        if (select.dataset.modified === 'true') {
            return true;
        }

        // Add empty placeholder option at the beginning
        const placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.text = '-- Select an email --';
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        select.insertBefore(placeholderOption, select.firstChild);

        // Make the select required
        select.required = true;

        // Add visual indication that selection is required
        select.style.borderColor = '#cf222e';

        // Find and modify the Confirm merge button
        const confirmButton = document.querySelector('button:has(> .Button-content > .Button-label)');
        const allButtons = document.querySelectorAll('button');
        let mergeButton = null;

        allButtons.forEach(btn => {
            if (btn.textContent.includes('Confirm merge')) {
                mergeButton = btn;
            }
        });

        // Add validation on form submission / button click
        if (mergeButton) {
            mergeButton.addEventListener('click', function(e) {
                if (select.value === '') {
                    e.preventDefault();
                    e.stopPropagation();
                    select.style.borderColor = '#cf222e';
                    select.style.boxShadow = '0 0 0 3px rgba(207, 34, 46, 0.3)';
                    select.focus();

                    // Show alert or create error message
                    let errorMsg = select.parentElement.querySelector('.commit-email-error');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'commit-email-error';
                        errorMsg.style.cssText = 'color: #cf222e; font-size: 12px; margin-top: 4px;';
                        errorMsg.textContent = 'Please select a commit email address';
                        select.parentElement.appendChild(errorMsg);
                    }
                    return false;
                }
            }, true);
        }

        // Update visual state when selection changes
        select.addEventListener('change', function() {
            if (select.value !== '') {
                select.style.borderColor = '';
                select.style.boxShadow = '';
                const errorMsg = select.parentElement.querySelector('.commit-email-error');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });

        // Mark as modified
        select.dataset.modified = 'true';

        console.log('[Commit Email Required] Successfully modified the commit email dropdown');
        return true;
    }

    // Use MutationObserver to detect when the merge form appears
    let attempts = 0;
    const observer = new MutationObserver((mutations, obs) => {
        if (modifyCommitEmailDropdown()) {
            // Keep observing in case the form is re-rendered
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also try immediately and with polling for initial load
    function pollForDropdown() {
        attempts++;
        if (modifyCommitEmailDropdown() || attempts >= MAX_ATTEMPTS) {
            return;
        }
        setTimeout(pollForDropdown, POLL_INTERVAL);
    }

    pollForDropdown();
})();
