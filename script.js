
        const menuData = [
            { id: 1, name: "Spicy Zinger", category: "burger", price: 550, img: "zinger1.png", desc: "Crispy chicken with spicy mayo sauce." },
            { id: 2, name: "Special Pizza", category: "Pizza", price: 1450, img: "pizza.png", desc: "Double patty beef burger with cheese." },
             { id: 3, name: "Pizza", category: "Pizza", price: 1350, img: "pizza 2.jpg", desc: "Double patty beef burger with cheese." },
            
            { id: 4, name: "Behari Boti", category: "Boti", price: 1200, img: "behari boti.png", desc: "Italian crust with lots of cheese." },
            { id: 5, name: "Special Macroni", category: "desi", price: 350, img: "macroni.jpg", desc: "BBQ grilled chicken piece with naan." },
            { id: 6, name: "Fries", category: "desi", price: 100, img: "fries.jpg", desc: "Juicy beef mince kebabs." }
            
        ];

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const waNum = "+92253209977";

        const grid = document.getElementById('menuGrid');
        function render(items) {
            grid.innerHTML = items.map((i, index) => `
                <div class="food-card" style="animation-delay: ${index * 0.1}s">
                    <div class="card-img-box"><img src="${i.img}" class="card-img" onclick="openModal(${i.id})"></div>
                    <div class="card-info">
                        <div class="card-title">${i.name}</div>
                        <div style="color:#777; font-size:13px; margin-bottom:15px;">${i.desc}</div>
                        <div class="card-footer">
                            <span class="price">Rs. ${i.price}</span>
                            <button class="add-btn" onclick="addToCart(${i.id})"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            `).join('');
            setTimeout(checkScroll, 100);
        }
        render(menuData);

        function toggleSearch() { 
            const el = document.getElementById('searchContainer'); el.classList.toggle('active');
            if(el.classList.contains('active')) document.getElementById('searchInput').focus();
        }
        function filterMenu() { const val = document.getElementById('searchInput').value.toLowerCase(); render(menuData.filter(i => i.name.toLowerCase().includes(val))); }
        function filterCategory(cat, btn) { document.querySelectorAll('.cat-item').forEach(e => e.classList.remove('active')); btn.classList.add('active'); if(cat==='all') render(menuData); else render(menuData.filter(i => i.category === cat)); }

        function toggleCart() { document.getElementById('cartSidebar').classList.toggle('active'); document.getElementById('cartOverlay').classList.toggle('active'); }
        function addToCart(id) {
            const item = menuData.find(i => i.id === id); const exist = cart.find(i => i.id === id);
            if(exist) exist.qty++; else cart.push({...item, qty:1}); saveCart();
            const b = document.getElementById('cartCount'); 
            b.classList.add('pop'); setTimeout(()=>b.classList.remove('pop'), 300);
            toggleCart();
        }
        function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }
        function updateCartUI() {
            const body = document.getElementById('cartBody'); let total = 0, count = 0;
            if(cart.length===0) body.innerHTML="<p style='text-align:center; color:#666; margin-top:20px;'>Cart is Empty</p>";
            else {
                body.innerHTML = cart.map((i, idx) => {
                    total += i.price * i.qty; count += i.qty;
                    return `<div style="display:flex; gap:10px; margin-bottom:15px; border-bottom:1px solid #333; padding-bottom:10px;">
                        <img src="${i.img}" style="width:50px; height:50px; border-radius:8px;">
                        <div style="flex:1;"><div>${i.name}</div><div style="font-size:12px; color:var(--primary);">Rs.${i.price} x ${i.qty}</div></div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <i class="fas fa-minus" style="cursor:pointer;" onclick="modQty(${idx}, -1)"></i><span>${i.qty}</span><i class="fas fa-plus" style="cursor:pointer;" onclick="modQty(${idx}, 1)"></i>
                        </div><i class="fas fa-trash" style="color:#ff4757; margin-left:10px; cursor:pointer;" onclick="rmItem(${idx})"></i></div>`;
                }).join('');
            }
            document.getElementById('cartTotal').innerText = "Rs. " + total; document.getElementById('cartCount').innerText = count;
        }
        function modQty(i, v) { cart[i].qty+=v; if(cart[i].qty<=0) cart.splice(i,1); saveCart(); }
        function rmItem(i) { cart.splice(i,1); saveCart(); }
        updateCartUI();

        function toggleMobileNav() { document.getElementById('mobileNav').classList.toggle('active'); }
        function checkoutWhatsApp() { if(cart.length===0) return alert('Empty Cart'); let m="Order:%0A", t=0; cart.forEach(i=>{m+=`${i.name}(${i.qty}) Rs.${i.price*i.qty}%0A`; t+=i.price*i.qty;}); window.open(`https://wa.me/${waNum}?text=${m}%0ATotal: Rs.${t}`, '_blank'); }
        function openModal(id) {
            const i=menuData.find(x=>x.id===id); document.getElementById('m-img').src=i.img; document.getElementById('m-title').innerText=i.name;
            document.getElementById('m-desc').innerText=i.desc; document.getElementById('m-price').innerText="Rs. "+i.price;
            document.getElementById('m-btn').onclick=()=>{addToCart(id); document.getElementById('prodModal').style.display='none';};
            document.getElementById('prodModal').style.display='flex';
        }

        window.addEventListener('scroll', checkScroll);
        function checkScroll() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(reveal => {
                if (reveal.getBoundingClientRect().top < window.innerHeight - 50) reveal.classList.add('active');
            });
            document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
        }
        checkScroll();


