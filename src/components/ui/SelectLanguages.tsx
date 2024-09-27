'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const languages = [
  {
    id: 71,
    name: 'Python',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Python_logo_01.svg',
  },
  {
    id: 62,
    name: 'Java',
    avatar: 'https://www.vectorlogo.zone/logos/java/java-icon.svg',
  },
  {
    id: 50,
    name: 'C',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/18/C_Programming_Language.svg',
  },
  {
    id: 54,
    name: 'C++',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg',
  },
  {
    id: 63,
    name: 'JS',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
  },
  {
    id: 73,
    name: 'Rust',
    avatar: 'https://icons.veryicon.com/png/o/business/vscode-program-item-icon/rust-1.png',
  },
  {
    id: 60,
    name: 'Go',
    avatar: 'https://www.vectorlogo.zone/logos/golang/golang-icon.svg',
  },
]

interface SelectLanguagesProps {
  onChange: (id: number) => void;
  value: number; // Added value prop to accept selected language ID from parent
}

export default function SelectLanguages({ onChange, value }: SelectLanguagesProps) {
  const [selected, setSelected] = useState(languages[0]); // Default to Python

  // Sync the local selected state when the value prop changes
  useEffect(() => {
    const selectedLanguage = languages.find(lang => lang.id === value);
    if (selectedLanguage) {
      setSelected(selectedLanguage);
    }
  }, [value]);

  const handleChange = (language: typeof languages[0]) => {
    setSelected(language);
    onChange(language.id); // Pass the selected language ID to the parent
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <div className="relative">
        <ListboxButton className="relative w-[150px] cursor-default rounded-md bg-dark py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-accent sm:text-sm sm:leading-6">
          <span className="flex items-center">
            {selected?.avatar && <Image 
              alt="Selected language"
              src={selected.avatar} 
              className="h-5 w-5 flex-shrink-0 rounded-full" 
              width={20} 
              height={20} 
            /> }
            
            <span className="ml-3 block truncate">{selected?.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-[150px] overflow-auto rounded-md bg-dark py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {languages.map((language) => (
            <ListboxOption
              key={language.id}
              value={language}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-white hover:cursor-pointer data-[focus]:bg-accent data-[focus]:text-white"
            >
              <div className="flex items-center">
                <Image 
                  alt={language.name} 
                  src={language.avatar} 
                  className="h-5 w-5 flex-shrink-0 rounded-full" 
                  width={20} 
                  height={20} 
                />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {language.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-accent group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
