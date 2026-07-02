import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Treemap,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Bell,
  Brain,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleCheck,
  CircleX,
  Download,
  FileText,
  Gauge,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  Upload,
  User,
  Users,
  WandSparkles,
} from 'lucide-react'
import {
  useMemo,
  useState,
  useEffect,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from 'react'
import {
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'

const cn = (...inputs: Array<string | false | null | undefined>) =>
  twMerge(clsx(inputs))

const mockCandidates = [
  {
    id: 'c-1',
    name: 'Aisha Raman',
    role: 'Senior ML Engineer',
    experience: 8,
    education: 'MSc AI, Stanford',
    location: 'San Francisco, US',
    overall: 93,
    semantic: 95,
    skill: 91,
    recommendation: 'Strong Hire',
    status: 'Shortlisted',
    strengths: ['LLM fine-tuning', 'Python', 'MLOps', 'Vector Databases'],
    missing: ['Go'],
  },
  {
    id: 'c-2',
    name: 'Miguel Torres',
    role: 'Staff Data Scientist',
    experience: 10,
    education: 'PhD Computer Science, ETH Zurich',
    location: 'Zurich, CH',
    overall: 89,
    semantic: 90,
    skill: 87,
    recommendation: 'Hire',
    status: 'In Review',
    strengths: ['Applied statistics', 'NLP', 'A/B testing'],
    missing: ['Kubernetes'],
  },
  {
    id: 'c-3',
    name: 'Neha Gupta',
    role: 'AI Product Engineer',
    experience: 6,
    education: 'BTech CSE, IIT Delhi',
    location: 'Bengaluru, IN',
    overall: 86,
    semantic: 84,
    skill: 88,
    recommendation: 'Hire with Coaching',
    status: 'Interview',
    strengths: ['React', 'Prompt design', 'API orchestration'],
    missing: ['Leadership depth'],
  },
  {
    id: 'c-4',
    name: 'Liam O’Connor',
    role: 'Backend Engineer',
    experience: 5,
    education: 'BSc Software Engineering',
    location: 'Dublin, IE',
    overall: 73,
    semantic: 70,
    skill: 77,
    recommendation: 'Maybe',
    status: 'Screening',
    strengths: ['Node.js', 'PostgreSQL'],
    missing: ['Machine Learning', 'Embeddings'],
  },
]

const navigation = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/recruitment', label: 'Recruitment', icon: Briefcase },
  { to: '/candidates', label: 'Candidates', icon: Users },
  { to: '/jobs', label: 'Job Descriptions', icon: FileText },
  { to: '/reports', label: 'Reports', icon: Download },
  { to: '/analytics', label: 'Analytics', icon: Gauge },
  { to: '/insights', label: 'AI Insights', icon: Brain },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/help', label: 'Help Center', icon: HelpCircle },
]

const activityFeed = [
  'Resume processed for Aisha Raman',
  'Ranking complete for Senior ML Engineer role',
  'AI report generated for APAC talent pipeline',
  'Candidate similarity analysis refreshed',
]

const chartData = [
  { month: 'Jan', applications: 120, hires: 14 },
  { month: 'Feb', applications: 148, hires: 19 },
  { month: 'Mar', applications: 172, hires: 23 },
  { month: 'Apr', applications: 210, hires: 26 },
  { month: 'May', applications: 242, hires: 31 },
  { month: 'Jun', applications: 265, hires: 34 },
]

const funnelData = [
  { value: 1000, name: 'Applied' },
  { value: 620, name: 'Screened' },
  { value: 290, name: 'Interviewed' },
  { value: 121, name: 'Final Round' },
  { value: 39, name: 'Hired' },
]

const radarData = [
  { subject: 'NLP', A: 92, B: 81 },
  { subject: 'System Design', A: 88, B: 77 },
  { subject: 'MLOps', A: 94, B: 69 },
  { subject: 'Leadership', A: 79, B: 74 },
  { subject: 'Product Sense', A: 83, B: 71 },
  { subject: 'Coding', A: 91, B: 85 },
]

const treemapData = [
  { name: 'Python', size: 410 },
  { name: 'TensorFlow', size: 220 },
  { name: 'PyTorch', size: 340 },
  { name: 'Kubernetes', size: 170 },
  { name: 'AWS', size: 280 },
  { name: 'RAG', size: 260 },
  { name: 'Node.js', size: 140 },
]

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400',
        secondary:
          'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
        ghost:
          'border-transparent bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type Candidate = (typeof mockCandidates)[number]

type UploadEntry = {
  id: string
  name: string
  size: number
  progress: number
  stage: 'Uploading' | 'Extracting' | 'Embedding' | 'Ranking' | 'Complete' | 'Failed'
}

type ApiStatus = {
  key: string
  ok: boolean
}

const requiredEnvKeys = [
  'VITE_OPENAI_API_KEY',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
] as const

function detectApiStatus(): ApiStatus[] {
  return requiredEnvKeys.map((key) => {
    const value = import.meta.env[key]
    const isPlaceholder =
      !value ||
      String(value).includes('your_') ||
      String(value).includes('_here')
    return { key, ok: !isPlaceholder }
  })
}

function downloadBlob(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function nameFromResume(filename: string) {
  const base = filename.replace(/\.[^/.]+$/, '')
  return base
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function buildCandidateFromFile(file: File, rankSeed: number): Candidate {
  const name = nameFromResume(file.name)
  const overall = Math.min(98, 72 + ((file.size + rankSeed * 31) % 27))
  const semantic = Math.min(99, overall + 2)
  const skill = Math.max(62, overall - 3)
  const experience = 2 + ((file.size + rankSeed * 11) % 10)
  return {
    id: `c-upload-${Date.now()}-${rankSeed}`,
    name,
    role: 'AI Engineer Candidate',
    experience,
    education: 'Auto-parsed from resume',
    location: 'Location inferred from profile',
    overall,
    semantic,
    skill,
    recommendation: overall >= 90 ? 'Strong Hire' : overall >= 82 ? 'Hire' : 'Maybe',
    status: overall >= 86 ? 'Shortlisted' : 'In Review',
    strengths: ['Semantic Search', 'Problem Solving', 'Software Engineering'],
    missing: overall >= 86 ? ['Distributed Systems'] : ['MLOps', 'Distributed Systems'],
  }
}

function AnimatedScore({ value }: { value: number }) {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 70, damping: 20 })
  const rounded = useTransform(spring, (latest) => Math.round(latest))

  return (
    <motion.span
      onViewportEnter={() => motionValue.set(value)}
      className="text-4xl font-bold text-blue-600 dark:text-blue-400"
    >
      <motion.span>{rounded}</motion.span>%
    </motion.span>
  )
}

function SectionTitle({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      {action}
    </div>
  )
}

function GlassCard({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('glass rounded-2xl p-5 shadow-soft', className)}>{children}</div>
}

function StatCard({
  title,
  value,
  delta,
  icon: Icon,
}: {
  title: string
  value: string
  delta: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="soft-card"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">{title}</span>
        <Icon className="h-4 w-4 text-blue-500" />
      </div>
      <div className="text-2xl font-semibold text-slate-900 dark:text-white">{value}</div>
      <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
        <ChevronUp className="h-4 w-4" /> {delta}
      </p>
    </motion.div>
  )
}

function DashboardPage() {
  return (
    <div>
      <SectionTitle
        title="Executive Dashboard"
        description="Hiring Beyond Keywords. Monitor pipelines, quality scores, and AI recommendations in real time."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Candidates" value="3,426" delta="+12.3% this month" icon={Users} />
        <StatCard title="Jobs Posted" value="184" delta="+8.9% this month" icon={Briefcase} />
        <StatCard title="Average Match Score" value="87.1%" delta="+4.2% this month" icon={Gauge} />
        <StatCard title="Top Candidate" value="Aisha Raman" delta="93% fit score" icon={Sparkles} />
        <StatCard title="Shortlisted" value="141" delta="+17 this week" icon={CircleCheck} />
        <StatCard title="Rejected" value="29" delta="-12.7% this week" icon={CircleX} />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-5">
        <GlassCard className="xl:col-span-3">
          <h2 className="mb-4 text-lg font-semibold">Applications Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="apps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#2563eb" fill="url(#apps)" />
                <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Hiring Funnel</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  <LabelList position="right" dataKey="name" fill="currentColor" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Skill Distribution</h2>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: 'ML', value: 41 },
                    { name: 'Backend', value: 27 },
                    { name: 'Frontend', value: 18 },
                    { name: 'Product', value: 14 },
                  ]}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'].map((color) => (
                    <Cell key={color} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Experience Distribution</h2>
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart
                data={[
                  { band: '0-2', value: 84 },
                  { band: '3-5', value: 146 },
                  { band: '6-9', value: 129 },
                  { band: '10+', value: 54 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
                <XAxis dataKey="band" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {activityFeed.map((item) => (
              <li key={item} className="rounded-xl bg-slate-100/70 p-3 dark:bg-slate-800/60">
                {item}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}

const jobSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(80, 'Please provide a more complete role description.'),
})

type JobValues = z.infer<typeof jobSchema>

function JobDescriptionPage() {
  const form = useForm<JobValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: 'Senior AI Platform Engineer',
      description:
        'We are hiring an engineer with deep ML systems experience, strong API design, distributed systems expertise, and strong communication skills for cross-functional execution.',
    },
  })

  const onSubmit = form.handleSubmit(() => {
    window.alert('Job description parsed and AI summary generated.')
  })

  return (
    <div>
      <SectionTitle
        title="Job Description Intelligence"
        description="Paste or upload a role profile and let TalentMatch AI extract requirements, responsibilities, and ideal candidate signals."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block text-sm font-medium">Role Title</label>
            <input
              aria-label="Job title"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              {...form.register('title')}
            />

            <label className="block text-sm font-medium">Paste Job Description</label>
            <textarea
              aria-label="Job description"
              rows={9}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900"
              {...form.register('description')}
            />
            {form.formState.errors.description ? (
              <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <button className={buttonVariants({ variant: 'default' })} type="submit">
                <WandSparkles className="mr-2 h-4 w-4" /> Generate AI Summary
              </button>
              <button className={buttonVariants({ variant: 'secondary' })} type="button">
                <Upload className="mr-2 h-4 w-4" /> Upload PDF
              </button>
            </div>
          </form>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">AI Extracted Summary</h2>
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <p className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              Senior role focused on scalable AI services, semantic retrieval, and production-grade model orchestration for enterprise recruiting workflows.
            </p>
            <InfoGrid
              items={[
                ['Required Skills', 'Python, FastAPI, Vector DB, Prompt Engineering'],
                ['Preferred Skills', 'Kubernetes, Snowflake, LangGraph'],
                ['Experience', '6+ years in ML Platform or Data Systems'],
                ['Education', 'BS/MS in CS, AI, or equivalent experience'],
                ['Responsibilities', 'Build ranking pipelines, quality monitoring'],
                ['Technologies', 'OpenAI, Pinecone, React, TypeScript, AWS'],
              ]}
            />
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function InfoGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
          <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 text-sm">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ResumeUploadPage({
  onRankedCandidates,
}: {
  onRankedCandidates: (candidates: Candidate[]) => void
}) {
  const [uploads, setUploads] = useState<UploadEntry[]>([])
  const [pipelineStage, setPipelineStage] = useState(0)

  const onDrop = (files: File[]) => {
    setPipelineStage(0)
    files.forEach((file) => {
      const item: UploadEntry = {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        progress: 0,
        size: file.size,
        stage: 'Uploading',
      }
      setUploads((prev) => [...prev, item])

      const interval = setInterval(() => {
        setUploads((prev) =>
          prev.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  progress: Math.min(100, entry.progress + Math.ceil(Math.random() * 18)),
                  stage:
                    entry.progress > 88
                      ? 'Complete'
                      : entry.progress > 72
                        ? 'Ranking'
                        : entry.progress > 50
                          ? 'Embedding'
                          : entry.progress > 25
                            ? 'Extracting'
                            : 'Uploading',
                }
              : entry,
          ),
        )
      }, 450)

      setTimeout(() => {
        clearInterval(interval)
        setUploads((prev) =>
          prev.map((entry) =>
            entry.id === item.id
              ? { ...entry, progress: 100, stage: 'Complete' }
              : entry,
          ),
        )
      }, 3800)
    })

    const ranked = files.map((file, idx) => buildCandidateFromFile(file, idx + 1))
    onRankedCandidates(ranked)
    const stages = [0, 1, 2, 3, 4, 5, 6]
    stages.forEach((stage, idx) => {
      setTimeout(() => setPipelineStage(stage), idx * 550)
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  })

  return (
    <div>
      <SectionTitle
        title="Resume Upload & Processing"
        description="Drop multiple resumes to begin semantic extraction, embeddings creation, candidate ranking, and AI explanation generation."
      />

      <GlassCard>
        <div
          {...getRootProps()}
          className={cn(
            'cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition',
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
              : 'border-slate-300 hover:border-blue-400 dark:border-slate-600',
          )}
        >
          <input {...getInputProps()} aria-label="Upload resumes" />
          <Upload className="mx-auto h-10 w-10 text-blue-500" />
          <p className="mt-4 text-lg font-semibold">Drag and drop resumes here</p>
          <p className="mt-2 text-sm text-slate-500">Supports PDF and DOCX. Multiple files supported.</p>
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {uploads.map((file) => (
          <GlassCard key={file.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              {file.progress >= 100 ? (
                <CircleCheck className="h-5 w-5 text-emerald-500" />
              ) : (
                <span className="text-xs text-slate-500">{file.stage}...</span>
              )}
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <motion.div
                animate={{ width: `${file.progress}%` }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
              />
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-6">
        <h2 className="mb-4 text-lg font-semibold">Processing Pipeline</h2>
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-7">
          {['Uploading', 'Extracting Text', 'Understanding', 'Embeddings', 'Ranking', 'Explaining', 'Complete'].map(
            (step, idx) => (
              <motion.div
                key={step}
                initial={{ opacity: 0.2 }}
                animate={{ opacity: idx <= pipelineStage ? 1 : 0.35 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'rounded-xl border border-slate-200 p-3 text-center text-xs font-medium dark:border-slate-700',
                  idx <= pipelineStage && 'border-blue-300 bg-blue-50 dark:border-blue-700 dark:bg-blue-950/30',
                )}
              >
                {step}
              </motion.div>
            ),
          )}
        </div>
      </GlassCard>
    </div>
  )
}

function CandidateListPage({
  candidates,
}: {
  candidates: Candidate[]
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const filtered = useMemo(
    () =>
      candidates.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.role.toLowerCase().includes(query.toLowerCase()) ||
          c.education.toLowerCase().includes(query.toLowerCase()),
      ),
    [candidates, query],
  )

  const helper = createColumnHelper<Candidate>()
  const columns = [
    helper.accessor('name', {
      header: 'Candidate',
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    helper.accessor('overall', { header: 'Overall Match' }),
    helper.accessor('semantic', { header: 'Semantic Score' }),
    helper.accessor('skill', { header: 'Skill Match' }),
    helper.accessor('experience', {
      header: 'Experience',
      cell: (info) => `${info.getValue()} yrs`,
    }),
    helper.accessor('recommendation', { header: 'Recommendation' }),
    helper.accessor('status', {
      header: 'Status',
      cell: (info) => (
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-900/60 dark:text-blue-200">
          {info.getValue()}
        </span>
      ),
    }),
    helper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <button
          className={buttonVariants({ variant: 'ghost' })}
          onClick={() => navigate(`/candidates/${info.row.original.id}`)}
        >
          View
        </button>
      ),
    }),
  ]

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <SectionTitle
        title="Candidate Ranking"
        description="Explore candidates by AI match score, semantic relevance, and role-fit factors with recruiter-grade controls."
      />

      <GlassCard>
        <div className="mb-4 flex flex-wrap gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search candidate, skill, education"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm md:max-w-sm dark:border-slate-700 dark:bg-slate-900"
            aria-label="Search candidates"
          />
          <button className={buttonVariants({ variant: 'secondary' })}>Filters</button>
          <button className={buttonVariants({ variant: 'secondary' })}>Score Range</button>
          <button
            className={buttonVariants({ variant: 'default' })}
            onClick={() => {
              const csvHeader = 'Rank,Candidate,Overall Match,Semantic Score,Skill Match,Experience,Recommendation,Status\n'
              const csvBody = filtered
                .map((candidate, idx) => {
                  const fields = [
                    String(idx + 1),
                    candidate.name,
                    String(candidate.overall),
                    String(candidate.semantic),
                    String(candidate.skill),
                    String(candidate.experience),
                    candidate.recommendation,
                    candidate.status,
                  ]
                  return fields
                    .map((field) => `"${String(field).replace(/"/g, '""')}"`)
                    .join(',')
                })
                .join('\n')
              downloadBlob(
                `candidate-rankings-${new Date().toISOString().slice(0, 10)}.csv`,
                csvHeader + csvBody,
                'text/csv;charset=utf-8',
              )
            }}
          >
            Download Rankings CSV
          </button>
        </div>

        <div className="overflow-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              {table.getHeaderGroups().map((group) => (
                <tr key={group.id} className="border-b border-slate-200 dark:border-slate-700">
                  {group.headers.map((header) => (
                    <th key={header.id} className="p-3 font-semibold text-slate-500">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, idx) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <button
              className={buttonVariants({ variant: 'secondary' })}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className={buttonVariants({ variant: 'secondary' })}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

function CandidateDetailPage({
  candidates,
}: {
  candidates: Candidate[]
}) {
  const { id } = useParams()
  const candidate = candidates.find((c) => c.id === id) ?? candidates[0]

  return (
    <div>
      <SectionTitle
        title="Candidate Intelligence"
        description="Comprehensive profile with explainable AI recommendation, skill mapping, and interview strategy."
      />

      <GlassCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-bold text-white">
              {candidate.name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{candidate.name}</h2>
              <p className="text-sm text-slate-500">
                {candidate.role} • {candidate.location}
              </p>
              <p className="text-sm text-slate-500">{candidate.education}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Overall AI Match</p>
            <AnimatedScore value={candidate.overall} />
          </div>
        </div>
      </GlassCard>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <h2 className="mb-3 text-lg font-semibold">Professional Summary</h2>
          <p className="text-left text-sm leading-7 text-slate-600 dark:text-slate-300">
            Candidate demonstrates strong cross-functional engineering capability, deep semantic search knowledge, and practical experience translating enterprise hiring requirements into scalable AI ranking workflows.
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium">Matched Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.strengths.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.missing.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700 dark:bg-red-900/40 dark:text-red-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <Brain className="h-5 w-5 text-blue-500" /> AI Explanation
          </h2>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              Recommended due to strong semantic alignment and role-specific projects.
            </li>
            <li className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              Potential concern: limited exposure to distributed orchestration at scale.
            </li>
            <li className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              Interview focus: architecture trade-offs, system reliability, stakeholder communication.
            </li>
            <li className="rounded-xl bg-blue-50 p-3 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
              Confidence score: 0.91
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}

function ComparisonPage({
  candidates,
}: {
  candidates: Candidate[]
}) {
  const safeCandidates = candidates.length > 1 ? candidates : mockCandidates
  const [left, setLeft] = useState(safeCandidates[0].id)
  const [right, setRight] = useState(safeCandidates[1].id)

  const leftCandidate = safeCandidates.find((c) => c.id === left) ?? safeCandidates[0]
  const rightCandidate = safeCandidates.find((c) => c.id === right) ?? safeCandidates[1]

  return (
    <div>
      <SectionTitle
        title="Candidate Comparison"
        description="Compare top profiles side by side to decide final shortlist order with transparent AI evidence."
      />

      <GlassCard>
        <div className="grid gap-4 md:grid-cols-2">
          <select
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-900"
          >
            {safeCandidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
          <select
            value={right}
            onChange={(e) => setRight(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-900"
          >
            {safeCandidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[leftCandidate, rightCandidate].map((candidate) => (
            <div key={candidate.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
              <h2 className="text-lg font-semibold">{candidate.name}</h2>
              <p className="text-sm text-slate-500">{candidate.role}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <p>Overall: {candidate.overall}%</p>
                <p>Semantic: {candidate.semantic}%</p>
                <p>Skills: {candidate.skill}%</p>
                <p>Experience: {candidate.experience}y</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
          Winner: {leftCandidate.overall > rightCandidate.overall ? leftCandidate.name : rightCandidate.name}
        </div>
      </GlassCard>
    </div>
  )
}

function AnalyticsPage() {
  return (
    <div>
      <SectionTitle
        title="Analytics Studio"
        description="Track talent quality, hiring velocity, skill gaps, and technology trends with BI-ready visual intelligence."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Hiring Trends</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#2563eb" strokeWidth={2} />
                <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Top Technologies</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <Treemap data={treemapData} dataKey="size" stroke="#fff" fill="#6366f1" />
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Skill Gaps Radar</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
                <Radar dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-lg font-semibold">Education Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Bachelors', value: 42 },
                    { name: 'Masters', value: 39 },
                    { name: 'PhD', value: 12 },
                    { name: 'Other', value: 7 },
                  ]}
                  dataKey="value"
                  outerRadius={86}
                >
                  {['#2563eb', '#8b5cf6', '#10b981', '#f97316'].map((color) => (
                    <Cell key={color} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function ReportsPage({
  candidates,
}: {
  candidates: Candidate[]
}) {
  const downloadReport = (type: 'pdf' | 'csv') => {
    if (type === 'csv') {
      const csvHeader = 'Candidate,Overall,Recommendation,Status\n'
      const csvBody = candidates
        .map((candidate) => `${candidate.name},${candidate.overall},${candidate.recommendation},${candidate.status}`)
        .join('\n')
      downloadBlob(
        `talentmatch-report-${new Date().toISOString().slice(0, 10)}.csv`,
        csvHeader + csvBody,
        'text/csv;charset=utf-8',
      )
      return
    }

    const reportLines = [
      'TalentMatch AI Candidate Report',
      `Generated: ${new Date().toLocaleString()}`,
      '',
      ...candidates.map(
        (candidate, idx) =>
          `${idx + 1}. ${candidate.name} | Overall ${candidate.overall}% | ${candidate.recommendation} | ${candidate.status}`,
      ),
    ]
    downloadBlob(
      `talentmatch-report-${new Date().toISOString().slice(0, 10)}.txt`,
      reportLines.join('\n'),
      'text/plain;charset=utf-8',
    )
  }

  return (
    <div>
      <SectionTitle
        title="Reports & Exports"
        description="Generate recruiter-ready PDF and CSV reports for candidate evaluations, interview strategy, and executive hiring summaries."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          'Candidate Report',
          'Recruiter Summary',
          'Top Candidates',
          'Interview Recommendations',
          'Skill Gap Analysis',
          'Hiring Funnel Snapshot',
        ].map((report) => (
          <GlassCard key={report}>
            <h2 className="text-lg font-semibold">{report}</h2>
            <p className="mt-2 text-sm text-slate-500">Updated 2 minutes ago</p>
            <div className="mt-4 flex gap-2">
              <button className={buttonVariants({ variant: 'default' })} onClick={() => downloadReport('pdf')}>
                PDF
              </button>
              <button className={buttonVariants({ variant: 'secondary' })} onClick={() => downloadReport('csv')}>
                CSV
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

function AIInsightsPage() {
  return (
    <div>
      <SectionTitle
        title="AI Insights"
        description="Get proactive recommendations on talent pool quality, interview order, and strategic hiring opportunities."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {[
          ['Best Candidate', 'Aisha Raman has highest semantic and experience alignment.'],
          ['Most Common Missing Skill', 'Kubernetes appears in 46% of partially matched profiles.'],
          ['Talent Pool Quality', '74% of applicants pass baseline quality threshold.'],
          ['Suggested Interview Order', 'Prioritize NLP and MLOps experts for this hiring cycle.'],
        ].map(([title, text], idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
          >
            <GlassCard>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{text}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function RecruitmentPage({
  onRankedCandidates,
}: {
  onRankedCandidates: (candidates: Candidate[]) => void
}) {
  return (
    <div>
      <SectionTitle
        title="Recruitment Workspace"
        description="Run the full AI-powered recruitment flow: upload job descriptions, process resumes, rank candidates, and generate interview plans."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <GlassCard>
          <h2 className="text-lg font-semibold">1. Job Intake</h2>
          <p className="mt-2 text-sm text-slate-500">Collect role requirements and parse key competencies instantly.</p>
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold">2. Resume Intelligence</h2>
          <p className="mt-2 text-sm text-slate-500">Extract candidate signals and build semantic embeddings.</p>
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold">3. Ranking & Reports</h2>
          <p className="mt-2 text-sm text-slate-500">Create ranked recommendations with explainable AI reports.</p>
        </GlassCard>
      </div>
      <ResumeUploadPage onRankedCandidates={onRankedCandidates} />
    </div>
  )
}

function SettingsPage() {
  return (
    <div>
      <SectionTitle
        title="Settings"
        description="Manage workspace preferences, organization controls, AI behavior, notifications, and export policy."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="text-lg font-semibold">Organization</h2>
          <p className="mt-2 text-sm text-slate-500">Workspace: Global Recruiting Ops</p>
          <p className="text-sm text-slate-500">Language: English</p>
          <p className="text-sm text-slate-500">Theme: System / Light / Dark</p>
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold">AI Configuration</h2>
          <p className="mt-2 text-sm text-slate-500">Ranking model: Semantic Ensemble v2</p>
          <p className="text-sm text-slate-500">Confidence threshold: 0.74</p>
          <p className="text-sm text-slate-500">Explainability mode: Verbose</p>
        </GlassCard>
      </div>
    </div>
  )
}

function HelpPage() {
  return (
    <div>
      <SectionTitle
        title="Help Center"
        description="Get guidance for onboarding, parsing quality, ranking confidence, and enterprise integration best practices."
      />
      <GlassCard>
        <h2 className="text-lg font-semibold">Need support?</h2>
        <p className="mt-2 text-sm text-slate-500">
          Contact TalentMatch AI support at support@talentmatch.ai or open a live enterprise chat.
        </p>
      </GlassCard>
    </div>
  )
}

function useNotifications() {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const data = [
        { id: 1, text: 'Resume processed for Neha Gupta' },
        { id: 2, text: 'Ranking complete for 12 candidates' },
        { id: 3, text: 'PDF report generated for Product AI role' },
      ]
      const encoded = encodeURIComponent(JSON.stringify(data))
      const response = await axios.get<Array<{ id: number; text: string }>>(
        `data:application/json,${encoded}`,
      )
      return response.data
    },
  })
}

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const [dark, setDark] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [search, setSearch] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates)
  const [apiStatus, setApiStatus] = useState<ApiStatus[]>(detectApiStatus())
  const suggestions = ['Aisha Raman', 'Semantic Match', 'AI Product Engineer', 'NLP Skills', 'Top Candidates']
  const { data: notifications = [] } = useNotifications()

  useEffect(() => {
    setApiStatus(detectApiStatus())
  }, [])

  const results = suggestions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className={cn(dark && 'dark')}>
      <div className="flex min-h-screen w-full bg-transparent text-slate-900 dark:text-slate-100">
        <aside
          className={cn(
            'sticky top-0 hidden h-screen border-r border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 lg:block',
            collapsed ? 'w-20' : 'w-72',
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className={cn('transition-all', collapsed && 'hidden')}>
              <p className="text-xs uppercase tracking-[0.26em] text-slate-400">TalentMatch AI</p>
              <p className="gradient-title text-xl font-bold">Hiring Beyond Keywords.</p>
            </div>
            <button
              aria-label="Toggle sidebar"
              className={buttonVariants({ variant: 'ghost' })}
              onClick={() => setCollapsed((value) => !value)}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {!collapsed ? item.label : null}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="font-medium">Profile</p>
            {!collapsed ? <p className="text-xs text-slate-500">Global Talent Ops Admin</p> : null}
            <button className={cn(buttonVariants({ variant: 'ghost' }), 'mt-2 w-full justify-start')}>
              <LogOut className="mr-2 h-4 w-4" /> {!collapsed ? 'Logout' : ''}
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 md:px-6">
            <div className="flex items-center gap-3">
              <button className={cn(buttonVariants({ variant: 'ghost' }), 'lg:hidden')} aria-label="menu">
                <Menu className="h-4 w-4" />
              </button>
              <div className="relative max-w-xl flex-1">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search candidate, skills, jobs, education, companies"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm dark:border-slate-700 dark:bg-slate-900"
                  aria-label="Global search"
                />
                <AnimatePresence>
                  {search && results.length > 0 ? (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
                    >
                      {results.map((item) => (
                        <li key={item} className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </div>

              <button
                className={buttonVariants({ variant: 'secondary' })}
                onClick={() => setShowNotifications((value) => !value)}
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <button
                className={buttonVariants({ variant: 'secondary' })}
                onClick={() => setDark((value) => !value)}
                aria-label="Toggle dark mode"
              >
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button className={buttonVariants({ variant: 'secondary' })}>
                <User className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence>
              {showNotifications ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-4 top-16 z-40 w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-700 dark:bg-slate-900 md:right-6"
                >
                  <h3 className="mb-3 font-semibold">Notification Center</h3>
                  <ul className="space-y-2 text-sm">
                    {notifications.map((item) => (
                      <li key={item.id} className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </header>

          <main className="mx-auto w-full max-w-[1440px] p-4 md:p-6">
            <div className="mb-4 grid gap-3 lg:grid-cols-3">
              {apiStatus.map((item) => (
                <div
                  key={item.key}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-xs',
                    item.ok
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
                  )}
                >
                  <span className="font-semibold">{item.key}:</span> {item.ok ? 'Configured' : 'Missing / placeholder'}
                </div>
              ))}
            </div>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/recruitment" element={<RecruitmentPage onRankedCandidates={(items) => setCandidates(items)} />} />
              <Route path="/jobs" element={<JobDescriptionPage />} />
              <Route path="/candidates" element={<CandidateListPage candidates={candidates} />} />
              <Route path="/candidates/:id" element={<CandidateDetailPage candidates={candidates} />} />
              <Route path="/comparison" element={<ComparisonPage candidates={candidates} />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/reports" element={<ReportsPage candidates={candidates} />} />
              <Route path="/insights" element={<AIInsightsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
            <div className="mt-8">
              <ResumeUploadPage onRankedCandidates={(items) => setCandidates(items)} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
