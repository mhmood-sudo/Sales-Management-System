<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0d9488"> <meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="apple-touch-icon" href="/icons/icon-192.png"><link rel="manifest" href="{{ asset('manifest.json') }}">
    <title>تسجيل الدخول | SmartSales Manager</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="manifest" href="{{ asset('manifest.json') }}">
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register("{{ asset('sw.js') }}")
                .then(reg => console.log('PWA Ready!'))
                .catch(err => console.log('PWA Error', err));
        });
    }
</script>
    <style>
        body { font-family: 'Tajawal', sans-serif; }
        .glass {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
        /* إخفاء أيقونة العين الافتراضية في متصفح إيدج ومتصفحات أخرى لعدم التكرار */
        input::-ms-reveal, input::-ms-clear { display: none; }
    </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-teal-50 min-h-screen flex items-center justify-center p-4">

    <div class="glass w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/50 transition-all duration-300 hover:shadow-teal-100/50">

        <div class="text-center mb-10">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-teal-600 rounded-xl mb-4 shadow-lg shadow-teal-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </div>
            <h1 class="text-2xl font-bold text-slate-800">SmartSales Manager</h1>
            <p class="text-slate-500 mt-2">أهلاً بك، يرجى تسجيل الدخول للمتابعة</p>
        </div>

        <form action="/login" method="POST" class="space-y-6">
            <div>
                <label class="block text-sm font-medium text-slate-700 mb-2">البريد الإلكتروني</label>
                <div class="relative">
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </span>
                    <input type="email" name="email" required
                        class="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                        placeholder="example@mail.com">
                </div>
            </div>

            <div>
                <div class="flex justify-between mb-2">
                    <label class="text-sm font-medium text-slate-700">كلمة المرور</label>
                </div>
                <div class="relative">
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>

                    <input type="password" id="passwordInput" name="password" required
                        class="w-full pr-10 pl-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-300"
                        placeholder="••••••••">

                    <button type="button" onclick="togglePassword()" class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 hover:text-teal-600 transition-colors">
                        <svg id="eyeOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <svg id="eyeClosed" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex justify-between mb-2">
                            <div class="flex items-center">
                <input type="checkbox" id="remember" class="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500 cursor-pointer">
                <label for="remember" class="mr-2 text-sm text-slate-600 cursor-pointer">تذكرني</label>
            </div>
                <a href="#" class="text-xs text-teal-600 hover:underline">نسيت كلمة المرور؟</a>
                </div>
                @if($errors->any())
<div class="bg-red-50 text-red-500 p-3 rounded-lg text-xs mb-4">
    {{ $errors->first() }}
</div>
@endif

            <button type="submit"
                class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-200 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95">
                دخول للنظام
            </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100 text-center">
            <p class="text-xs text-slate-400">جميع الحقوق محفوظة &copy; 2026</p>
            <p class="text-[10px] text-slate-300 mt-1 uppercase tracking-widest font-bold">Secure Infrastructure</p>
        </div>
    </div>

    <script>
        function togglePassword() {
            const passwordInput = document.getElementById('passwordInput');
            const eyeOpen = document.getElementById('eyeOpen');
            const eyeClosed = document.getElementById('eyeClosed');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeOpen.classList.add('hidden');
                eyeClosed.classList.remove('hidden');
            } else {
                passwordInput.type = 'password';
                eyeOpen.classList.remove('hidden');
                eyeClosed.classList.add('hidden');
            }
        }
    </script>
    <script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker Registered!', reg))
        .catch(err => console.log('Service Worker Error', err));
    });
  }
</script>
</body>
</html>
