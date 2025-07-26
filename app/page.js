import CreateTableForm from '../components/CreateTableForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Supabase Local Database Demo
        </h1>
        <CreateTableForm />
      </div>
    </div>
  );
}