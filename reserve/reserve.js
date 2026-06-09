// ── Populate date select ──
      (function () {
        const sel = document.getElementById('date');
        const now = new Date();
        for (let i = 0; i < 60; i++) {
          const d = new Date(now);
          d.setDate(now.getDate() + i);
          const opt = document.createElement('option');
          opt.value = d.toISOString().split('T')[0];
          opt.textContent = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          if (i === 0) opt.selected = true;
          sel.appendChild(opt);
        }
      })();
 
      // ── Step 1: enable Next when checkbox checked ──
      const agree = document.getElementById('agree');
      const btnNext1 = document.getElementById('btn-next-1');
      agree.addEventListener('change', () => {
        btnNext1.classList.toggle('enabled', agree.checked);
        btnNext1.style.cursor = agree.checked ? 'pointer' : 'not-allowed';
      });
 
      // ── Navigate steps ──
      function goTo(step) {
        document.querySelectorAll('.step-panel').forEach((p, i) => {
          p.classList.toggle('active', i + 1 === step);
        });
        document.querySelectorAll('.step-item').forEach((s, i) => {
          s.classList.remove('active', 'done');
          if (i + 1 < step) s.classList.add('done');
          if (i + 1 === step) s.classList.add('active');
        });
      }
 
      // Step 1 → 2
      btnNext1.addEventListener('click', () => {
        if (!agree.checked) return;
        goTo(2);
      });
 
      // Step 2 → 3
      document.getElementById('btn-next-2').addEventListener('click', () => {
        const fname = document.getElementById('fname').value.trim();
        const lname = document.getElementById('lname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        if (!fname || !lname || !email || !phone) {
          alert('Please fill in all required fields.');
          return;
        }
        // Populate confirmation
        document.getElementById('c-date').textContent = document.getElementById('date').options[document.getElementById('date').selectedIndex].text;
        document.getElementById('c-time').textContent = document.getElementById('time').value;
        const adults = document.getElementById('adults').value;
        const children = document.getElementById('children').value;
        document.getElementById('c-guests').textContent = adults + (children !== '0 Children' ? ', ' + children : '');
        document.getElementById('c-name').textContent = fname + ' ' + lname;
        document.getElementById('c-email').textContent = email;
        document.getElementById('c-phone').textContent = phone;
        const notes = document.getElementById('notes').value.trim();
        document.getElementById('c-notes').textContent = notes || '—';
        document.getElementById('c-notes-row').style.display = notes ? 'flex' : 'none';
        goTo(3);
      });
 
      // Back buttons
      document.getElementById('btn-back-2').addEventListener('click', () => goTo(1));
      document.getElementById('btn-back-3').addEventListener('click', () => goTo(2));
 
      // Confirm
      document.getElementById('btn-confirm').addEventListener('click', () => {
        const name = document.getElementById('fname').value.trim();
        document.querySelector('.modal-body').innerHTML = `
          <div class="success-wrap">
            <div class="success-icon">✓</div>
            <h3>Booking Confirmed!</h3>
            <p>Thank you, ${name}. Your reservation at Ro's Restaurant has been received. We'll send a confirmation to your email shortly.</p>
            <button class="btn-confirm" onclick="location.reload()">Make Another Booking</button>
          </div>`;
        document.querySelector('.stepper').querySelectorAll('.step-item').forEach(s => {
          s.classList.remove('active');
          s.classList.add('done');
        });
      });