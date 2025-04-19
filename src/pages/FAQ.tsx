import React from 'react';
import { useTranslation } from 'react-i18next';

const faqData = [
  {
    question: 'faq.q1',
    answer: 'faq.a1',
  },
  {
    question: 'faq.q2',
    answer: 'faq.a2',
  },
  {
    question: 'faq.q3',
    answer: 'faq.a3',
  },
  {
    question: 'faq.q4',
    answer: 'faq.a4',
  },
  {
    question: 'faq.q5',
    answer: 'faq.a5',
  },
];

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-6">{t('faq.title', 'FAQ - Questions fréquentes')}</h1>
      <div className="space-y-4">
        {faqData.map((item, idx) => (
          <div key={idx} className="border-b pb-4">
            <h2 className="font-semibold text-lg mb-1">{t(item.question)}</h2>
            <p className="text-gray-700">{t(item.answer)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
