'use client';

export function AboutSection() {
  return (
    <div className="bg-muted/50 rounded-lg p-8 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Tentang OptiScoop</h2>
      <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
        OptiScoop adalah aplikasi yang dirancang khusus untuk membantu profesional Humas 
        di sektor Imigrasi dan Pemasyarakatan Indonesia. Dengan memanfaatkan teknologi AI, 
        OptiScoop membantu menghasilkan konten berita dan judul yang optimal, 
        menghemat waktu dan meningkatkan kualitas publikasi.
      </p>
    </div>
  );
}