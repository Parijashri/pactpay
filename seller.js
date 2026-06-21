document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.counter').forEach((el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end, duration: 1.8, ease: 'power2.out', delay: .2,
      onUpdate: () => {
        el.textContent = decimals > 0
          ? obj.val.toFixed(decimals) + suffix
          : Math.round(obj.val).toLocaleString('en-IN') + suffix;
      }
    });
  });

  const canvas = document.getElementById('responseChart');
  if (canvas && window.Chart) {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6'],
        datasets: [{
          label: 'Avg. reply time (min)',
          data: [38, 30, 26, 22, 18, 14],
          borderColor: '#D9B650',
          backgroundColor: (ctx) => {
            const g = ctx.chart.ctx.createLinearGradient(0,0,0,160);
            g.addColorStop(0, '#D9B65033');
            g.addColorStop(1, '#D9B65000');
            return g;
          },
          fill: true, tension: .4, borderWidth: 2.4, pointRadius: 3,
          pointBackgroundColor: '#1A1A1A'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { callback: (v) => v + 'm' }, grid: { color: 'rgba(0,0,0,.06)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
});
