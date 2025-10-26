"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ButtonShowcase = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Beautiful Button Collection
        </h1>
        <p className="text-gray-600 text-lg">
          Modern, accessible, and beautifully designed buttons
        </p>
      </div>

      {/* Button Variants */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Button Variants
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Default</h3>
            <Button>Default Button</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Destructive</h3>
            <Button variant="destructive">Delete</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Outline</h3>
            <Button variant="outline">Outline</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Secondary</h3>
            <Button variant="secondary">Secondary</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Ghost</h3>
            <Button variant="ghost">Ghost</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Link</h3>
            <Button variant="link">Link Button</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Success</h3>
            <Button variant="success">Success</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Warning</h3>
            <Button variant="warning">Warning</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Info</h3>
            <Button variant="info">Info</Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Premium</h3>
            <Button variant="premium">Premium</Button>
          </div>
        </div>
      </section>

      {/* Button Sizes */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* Icon Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Icon Buttons</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="icon-sm" variant="outline">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
          <Button size="icon" variant="default">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
          <Button size="icon-lg" variant="premium">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </Button>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Loading States</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button loading>Loading...</Button>
          <Button variant="outline" loading>
            Processing
          </Button>
          <Button variant="success" loading>
            Saving
          </Button>
          <Button variant="destructive" loading>
            Deleting
          </Button>
        </div>
        <div className="mt-4">
          <Button onClick={handleLoadingDemo} disabled={loading}>
            {loading ? "Loading..." : "Click to Demo Loading"}
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Disabled States
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button disabled>Disabled Default</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
          <Button variant="destructive" disabled>
            Disabled Destructive
          </Button>
          <Button variant="premium" disabled>
            Disabled Premium
          </Button>
        </div>
      </section>

      {/* Real-world Examples */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Real-world Examples
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Save Changes</Button>
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Delete Account</Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="success">Approve</Button>
            <Button variant="warning">Review</Button>
            <Button variant="info">More Info</Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="premium" size="lg">
              Upgrade to Pro
            </Button>
            <Button variant="ghost">Learn More</Button>
            <Button variant="link">View Documentation</Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🎨 Beautiful Gradients
            </h3>
            <p className="text-gray-600 text-sm">
              Each button variant features carefully crafted gradients for a
              modern look.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ✨ Smooth Animations
            </h3>
            <p className="text-gray-600 text-sm">
              Hover effects, focus states, and active animations for better UX.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ♿ Accessible
            </h3>
            <p className="text-gray-600 text-sm">
              Built with accessibility in mind, including proper focus
              management.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📱 Responsive
            </h3>
            <p className="text-gray-600 text-sm">
              Multiple sizes and responsive design for all screen sizes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🔄 Loading States
            </h3>
            <p className="text-gray-600 text-sm">
              Built-in loading spinner and state management.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🎯 TypeScript
            </h3>
            <p className="text-gray-600 text-sm">
              Fully typed with TypeScript for better developer experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonShowcase;
