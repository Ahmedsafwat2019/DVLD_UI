interface LicenceCardProps {
  licenceClass: {
    className: string;
    classDescription: string;
    classFees: number;
    minimumAllowedAge: number;
  } | null;
}
const LicenceCard = ({ licenceClass }: LicenceCardProps) => {
  if (!licenceClass) return null; // لو مفيش اختيار

  return (
    <div className="animate-slideDown border-gray-200 dark:border-gray-700 dark:shadow-gray-900/20 to-gray-50 dark:from-gray-800 dark:to-gray-900 mt-6 rounded-xl border bg-gradient-to-br from-white p-6 shadow-lg transition-all duration-500">
      {/* Header with icon */}
      <div className="mb-4 flex items-center">
        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <svg
            className="h-6 w-6 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-gray-800 mb-1 text-xl font-bold dark:text-white">
            {licenceClass.className}
          </h3>
          <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
          {licenceClass.classDescription}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Fees Card */}
        <div className="rounded-lg border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
          <div className="mb-2 flex items-center">
            <svg
              className="mr-2 h-5 w-5 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              License Fees
            </span>
          </div>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">
            ${licenceClass.classFees}
          </p>
        </div>

        {/* Age Requirement Card */}
        <div className="rounded-lg border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="mb-2 flex items-center">
            <svg
              className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Minimum Age
            </span>
          </div>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {licenceClass.minimumAllowedAge}{" "}
            <span className="text-sm font-normal">years</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LicenceCard;
