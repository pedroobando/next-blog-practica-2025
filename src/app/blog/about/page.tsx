import Image from 'next/image';

export default function AboutPage() {
  return (
    <section className="w-full py-4 md:py-6 lg:py-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="my-4 space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              About Our Company
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              We are a passionate team dedicated to building innovative solutions that empower
              businesses and individuals. Our mission is to deliver high-quality products and
              services that make a real impact.
            </p>
          </div>

          <div className="my-10 relative w-full max-w-[900px] h-[300px] md:h-[400px] lg:h-[500px] mb-8">
            <Image
              src="/placeholder.svg?height=500&width=900"
              alt="Modern office space with team collaborating"
              fill
              className="rounded-lg object-cover"
              priority
            />
          </div>

          <div className="max-w-[900px] text-left text-muted-foreground md:text-lg">
            <p className="mb-4">
              Founded in {new Date().getFullYear() - 5}, Acme Inc. started with a vision to simplify
              complex challenges through technology. Over the years, we have grown into a diverse
              group of experts, each bringing unique skills and perspectives to the table. We
              believe in fostering a culture of collaboration, continuous learning, and
              customer-centricity.
            </p>
            <p className="mb-4">
              Our commitment to excellence drives everything we do, from the initial concept to the
              final deployment. We pride ourselves on our ability to adapt to new technologies and
              market demands, ensuring that our clients always receive cutting-edge solutions.
            </p>
            <p>
              Thank you for your interest in Acme Inc. We look forward to building a brighter future
              together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
