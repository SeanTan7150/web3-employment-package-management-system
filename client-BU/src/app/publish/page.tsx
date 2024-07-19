"use client";

import { Form } from "@/components/form/PublishJobForm";
import { Step } from "./steps/Step";

export default function Publish() {
  return (
    <>
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-4xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-700 from-sky-400">
          Publish a Job
        </span>
      </h1>

      {/* <ol className="flex">
        <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <FaFileWaveform className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" />
          </span>
        </li>

        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <FaLocationDot className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
          </span>
        </li>

        <li className="flex items-center w-full">
          <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <GiReceiveMoney className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" />
          </span>
        </li>
      </ol> */}
      <Form>
        <Step />
      </Form>
    </>
  );
}
