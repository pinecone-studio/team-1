const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
      {/* Арын фон дээрх зөөлөн чимэглэл */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-gray-100 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-slate-200/50 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="overflow-hidden rounded-3xl border border-gray-200/50 bg-white/70 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
          {/* Дээд талын жижиг текст */}
          {/* <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Admin Dashboard
            </span>
          </div> */}

          <div className="text-center">
            <h1 className="text-6xl font-black tracking-tighter text-gray-900 md:text-7xl">
              Welcome to <br />
              <span className="bg-gradient-to-b from-gray-900 to-gray-500 bg-clip-text text-transparent">
                Backend
              </span>
            </h1>

            <p className="mt-8 text-lg leading-relaxed text-gray-500">
              Системийн өгөгдөл, хэрэглэгч болон тохиргоог удирдах{' '}
              <br className="hidden md:block" />
              төв хяналтын хэсэгт тавтай морилно уу.
            </p>

            {/* Үйлдэл хийх хэсэг */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="w-full rounded-xl bg-gray-900 px-8 py-4 font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg sm:w-auto">
                <a href=""> Системд нэвтрэх</a>
              </button>
            </div>
          </div>
        </div>

        {/* Доод талын жижиг текст */}
        <p className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Бүх эрх хуулиар хамгаалагдаагүй.
        </p>
      </div>
    </div>
  );
};

export default Home;
