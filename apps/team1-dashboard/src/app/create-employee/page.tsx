'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  UserPlus,
  Loader2,
  Image as ImageIcon,
  Calendar,
  Github,
  BadgeCheck,
} from 'lucide-react';

interface EmployeeFormValues {
  id?: string;
  entraId: string;
  firstName: string;
  lastName: string;
  firstNameEng: string;
  lastNameEng: string;
  email: string;
  imageUrl?: string | null;
  hireDate: string;
  terminationDate?: string | null;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  numberOfVacationDays: number;
  github?: string | null;
  department: string;
  branch: string;
  employeeCode: string;
  level: 'Junior' | 'Mid' | 'Senior';
  isKpi: boolean;
  isSalaryCompany: boolean;
  birthDayAndMonth?: string | null;
  birthdayPoster?: string | null;
}

export default function FullEmployeeForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<EmployeeFormValues>({
    defaultValues: {
      status: 'ACTIVE',
      level: 'Junior',
      isKpi: true,
      isSalaryCompany: true,
      numberOfVacationDays: 15,
      firstName: '',
      lastName: '',
      email: '',
      entraId: '',
      firstNameEng: '',
      lastNameEng: '',
      employeeCode: '',
      department: '',
      branch: '',
    },
  });

  const CREATE_MUTATION = `
    mutation CreateEmployee($input: CreateEmployeeInput!) {
      createEmployee(input: $input) {
        id
        entraId
        firstName
        lastName
        firstNameEng
        lastNameEng
        email
        imageUrl
        hireDate
        terminationDate
        status
        numberOfVacationDays
        github
        department
        branch
        employeeCode
        level
        isKpi
        isSalaryCompany
        birthDayAndMonth
        birthdayPoster
        createdAt
        updatedAt
      }
    }
  `;

  const onSubmit: SubmitHandler<EmployeeFormValues> = async (data) => {
    const formattedInput = {
      ...data,
      numberOfVacationDays: Number(data.numberOfVacationDays),
      terminationDate: data.terminationDate || null,
      birthDayAndMonth: data.birthDayAndMonth || null,
      imageUrl: data.imageUrl || null,
      birthdayPoster: data.birthdayPoster || null,
      github: data.github || null,
    };

    try {
      const response = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: CREATE_MUTATION,
          variables: { input: formattedInput },
        }),
      });

      const result = await response.json();
      if (result.errors) throw new Error(result.errors[0].message);

      const createdEmployee = result.data.createEmployee;
      console.log('Server Response:', createdEmployee);

      alert(
        `Success!\nEmployee: ${createdEmployee.firstNameEng}\nID: ${createdEmployee.id}`,
      );
      reset();
    } catch (error: any) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 md:p-12 bg-white border border-slate-200 shadow-2xl rounded-[2.5rem]">
      {/* Header Section */}
      <div className="flex items-center gap-5 mb-12 border-b border-slate-100 pb-8">
        <div className="p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100">
          <UserPlus size={40} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Employee Profile
          </h1>
          <p className="text-slate-400 font-bold tracking-widest text-xs uppercase underline decoration-indigo-500 decoration-2">
            Professional Onboarding System
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
        {/* Names Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <InputGroup
            label="Last Name (MN)"
            name="lastName"
            register={register}
            rules={{ required: 'Last Name (MN) is required' }}
            error={errors.lastName}
          />
          <InputGroup
            label="First Name (MN)"
            name="firstName"
            register={register}
            rules={{ required: 'First Name (MN) is required' }}
            error={errors.firstName}
          />
          <InputGroup
            label="Last Name (EN)"
            name="lastNameEng"
            register={register}
            rules={{ required: 'Last Name (EN) is required' }}
            error={errors.lastNameEng}
          />
          <InputGroup
            label="First Name (EN)"
            name="firstNameEng"
            register={register}
            rules={{ required: 'First Name (EN) is required' }}
            error={errors.firstNameEng}
          />
        </section>

        {/* Contact & IDs Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-slate-50 p-8 rounded-3xl shadow-inner border border-slate-100">
          <InputGroup
            label="Work Email"
            name="email"
            type="email"
            register={register}
            rules={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
            }}
            error={errors.email}
          />
          <InputGroup
            label="Entra ID"
            name="entraId"
            register={register}
            rules={{ required: 'Entra ID is required' }}
            error={errors.entraId}
          />
          <InputGroup
            label="Employee Code"
            name="employeeCode"
            register={register}
            rules={{ required: 'Code is required' }}
            error={errors.employeeCode}
          />
        </section>

        {/* Dates Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputGroup
            label="Hire Date"
            name="hireDate"
            type="date"
            register={register}
            rules={{ required: 'Hire date is required' }}
            error={errors.hireDate}
            icon={<Calendar size={14} />}
          />
          <InputGroup
            label="Termination Date"
            name="terminationDate"
            type="date"
            register={register}
            error={errors.terminationDate}
          />
          <InputGroup
            label="Birthday (MM-DD)"
            name="birthDayAndMonth"
            register={register}
            placeholder="e.g. 05-21"
            icon={<Calendar size={14} />}
          />
        </section>

        {/* Classification Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <SelectGroup
            label="Status"
            name="status"
            register={register}
            options={['ACTIVE', 'ON_LEAVE', 'TERMINATED']}
          />
          <SelectGroup
            label="Department"
            name="department"
            register={register}
            rules={{ required: 'Select Department' }}
            options={['IT', 'HR', 'Sales', 'Finance']}
            error={errors.department}
          />
          <SelectGroup
            label="Branch"
            name="branch"
            register={register}
            rules={{ required: 'Select Branch' }}
            options={['Main', 'West', 'East']}
            error={errors.branch}
          />
          <SelectGroup
            label="Level"
            name="level"
            register={register}
            options={['Junior', 'Mid', 'Senior']}
          />
        </section>

        {/* KPI & Payroll Section */}
        <section className="flex flex-wrap items-center gap-12 p-8 bg-indigo-50/30 rounded-3xl border border-indigo-100 shadow-sm">
          <CheckboxGroup label="Enable KPI" name="isKpi" register={register} />
          <CheckboxGroup
            label="Enable Payroll"
            name="isSalaryCompany"
            register={register}
          />
          <div className="flex-1 min-w-[200px]">
            <InputGroup
              label="Vacation Days"
              name="numberOfVacationDays"
              type="number"
              register={register}
            />
          </div>
        </section>

        {/* Media Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InputGroup
            label="Profile Image URL"
            name="imageUrl"
            register={register}
            icon={<ImageIcon size={14} />}
          />
          <InputGroup
            label="Birthday Poster URL"
            name="birthdayPoster"
            register={register}
            icon={<ImageIcon size={14} />}
          />
          <InputGroup
            label="Github Username"
            name="github"
            register={register}
            icon={<Github size={14} />}
          />
        </section>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-8 bg-slate-900 hover:bg-indigo-600 text-white font-black text-2xl rounded-[2rem] shadow-2xl transition-all flex items-center justify-center gap-4 active:scale-[0.98] disabled:bg-slate-300"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={32} />
          ) : (
            <>
              SAVE RECORD <BadgeCheck size={32} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// --- UI Components ---

const InputGroup = ({
  label,
  name,
  type = 'text',
  register,
  rules,
  error,
  icon,
  placeholder,
}: any) => (
  <div className="flex flex-col gap-2.5">
    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      {icon} {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, rules)}
      className={`w-full p-4 bg-white border ${error ? 'border-red-500 ring-4 ring-red-50' : 'border-slate-200'} rounded-2xl focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700`}
    />
    {error && (
      <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter">
        {error.message}
      </span>
    )}
  </div>
);

const SelectGroup = ({ label, name, register, rules, options, error }: any) => (
  <div className="flex flex-col gap-2.5">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      {label}
    </label>
    <select
      {...register(name, rules)}
      className={`w-full p-4 bg-white border ${error ? 'border-red-500' : 'border-slate-200'} rounded-2xl focus:border-indigo-500 outline-none font-semibold text-slate-700 shadow-sm appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23CBDAED%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.4-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.5rem_center] bg-no-repeat`}
    >
      <option value="">Select...</option>
      {options.map((o: string) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
    {error && (
      <span className="text-red-500 text-[10px] font-bold uppercase tracking-tighter">
        {error.message}
      </span>
    )}
  </div>
);

const CheckboxGroup = ({ label, name, register }: any) => (
  <label className="flex items-center gap-4 cursor-pointer group">
    <input
      type="checkbox"
      {...register(name)}
      className="w-7 h-7 rounded-xl border-2 border-slate-300 text-indigo-600 focus:ring-offset-0 focus:ring-transparent transition cursor-pointer"
    />
    <span className="text-sm font-black uppercase tracking-widest text-slate-600 group-hover:text-indigo-600 transition">
      {label}
    </span>
  </label>
);
