'use client'

import Avatar from '@/components/Avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CREATE_CHATBOT } from '@/graphql/mutations/mutations';
import { useMutation } from '@apollo/client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

function CreateChatbot() {
    const { user } = useUser();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const [createChatbot, { data, loading }] = useMutation(CREATE_CHATBOT, {
        variables: {
            clerk_user_id: user?.id,
            name,
            created_at: new Date().toISOString(),
        },
        onError: (error) => {
            console.error('Error creating chatbot:', error);
            setError('Failed to create chatbot. Please try again!');
        },
        onCompleted: (data) => {
            console.log('Chatbot Created:', data);
            setName('');
            router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);
        },
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await createChatbot();
        } catch (err) {
            console.error('Error creating chatbot:', err);
            setError('Failed to create chatbot. Please try again!');
        }
    };

    return (
        <div className="flex flex-col items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
            <Avatar seed="create-chatbot" />
            <div>
                <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
                <h2 className="font-light">
                    Create a new chatbot to assist you in your conversations with your customers
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
                    <Input
                        placeholder="Chatbot Name..."
                        className="max-w-lg"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled={loading || !name}>
                        {loading ? 'Creating...' : 'Create Chatbot'}
                    </Button>
                </form>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
            </div>
        </div>
    );
}

export default CreateChatbot;




// 'use client';

// import Avatar from '@/components/Avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { CREATE_CHATBOT } from '@/graphql/mutations/mutations';
// import { useMutation } from '@apollo/client';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation'; // Correct import for useRouter
// import React, { FormEvent, useState } from 'react';

// function CreateChatbot() {
//     const { user } = useUser();
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const [createChatbot, { data, loading }] = useMutation(CREATE_CHATBOT, {
//         onCompleted: (data) => {
//             console.log('Chatbot Created:', data);
//             setName('');
//             router.push(`/edit-chatbot/${data.insertChatbots.id}`); // Ensure this path matches your GraphQL response structure
//         },
//         onError: (error) => {
//             console.error('Error creating chatbot:', error);
//             setError('Failed to create chatbot. Please try again!');
//         },
//     });

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             await createChatbot({
//                 variables: {
//                     clerk_user_id: user?.id,
//                     name,
//                 },
//             });
//         } catch (err) {
//             console.error('Error creating chatbot:', err);
//             setError('Failed to create chatbot. Please try again!');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
//             <Avatar seed="create-chatbot" />
//             <div>
//                 <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
//                 <h2 className="font-light">
//                     Create a new chatbot to assist you in your conversations with your customers
//                 </h2>

//                 <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
//                     <Input
//                         placeholder="Chatbot Name..."
//                         className="max-w-lg"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" disabled={loading || !name}>
//                         {loading ? 'Creating...' : 'Create Chatbot'}
//                     </Button>
//                 </form>

//                 {error && <p className="text-red-500 mt-2">{error}</p>}

//                 <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
//             </div>
//         </div>
//     );
// }

// export default CreateChatbot;



// 'use client';

// import Avatar from '@/components/Avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { CREATE_CHATBOT } from '@/graphql/mutations/mutations';
// import { useMutation } from '@apollo/client';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation'; // Correct import for useRouter
// import React, { FormEvent, useState } from 'react';

// function CreateChatbot() {
//     const { user } = useUser();
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const [createChatbot, { data, loading }] = useMutation(CREATE_CHATBOT, {
//         onCompleted: (data) => {
//             console.log('Chatbot Created:', data);
//             setName('');
//             router.push(`/edit-chatbot/${data.insertChatbots.id}`); // Ensure this path matches your GraphQL response structure
//         },
//         onError: (error) => {
//             console.error('Error creating chatbot:', error);
//             setError('Failed to create chatbot. Please try again!');
//         },
//     });

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             await createChatbot({
//                 variables: {
//                     clerk_user_id: user?.id,
//                     name,
//                 },
//             });
//         } catch (err) {
//             console.error('Error creating chatbot:', err);
//             setError('Failed to create chatbot. Please try again!');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
//             <Avatar seed="create-chatbot" />
//             <div>
//                 <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
//                 <h2 className="font-light">
//                     Create a new chatbot to assist you in your conversations with your customers
//                 </h2>

//                 <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
//                     <Input
//                         placeholder="Chatbot Name..."
//                         className="max-w-lg"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" disabled={loading || !name}>
//                         {loading ? 'Creating...' : 'Create Chatbot'}
//                     </Button>
//                 </form>

//                 {error && <p className="text-red-500 mt-2">{error}</p>}

//                 <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
//             </div>
//         </div>
//     );
// }

// export default CreateChatbot;



// 'use client'

// import Avatar from '@/components/Avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { CREATE_CHATBOT } from '@/graphql/mutations/mutations';
// import { useMutation } from '@apollo/client';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation'; // Correct import for useRouter
// import React, { FormEvent, useState } from 'react';

// function CreateChatbot() {
//     const { user } = useUser();
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const [createChatbot, { data, loading }] = useMutation(CREATE_CHATBOT, {
//         variables: {
//             clerk_user_id: user?.id,
//             name,
//         },
//         onError: (error) => {
//             console.error('Error creating chatbot:', error);
//             setError('Failed to create chatbot. Please try again!');
//         },
//         onCompleted: (data: any) => {
//             console.log('Chatbot Created:', data);
//             setName('');
//             router.push(`/edit-chatbot/${data.data.insertChatbots.id}`); // Check this line
//         },
//     });

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             await createChatbot();
//         } catch (err) {
//             console.error('Error creating chatbot:', err);
//             setError('Failed to create chatbot. Please try again!');
//         }
//     };

//     return (
//         <div className="flex flex-col items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
//             <Avatar seed="create-chatbot" />
//             <div>
//                 <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
//                 <h2 className="font-light">
//                     Create a new chatbot to assist you in your conversations with your customers
//                 </h2>

//                 <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
//                     <Input
//                         placeholder="Chatbot Name..."
//                         className="max-w-lg"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" disabled={loading || !name}>
//                         {loading ? 'Creating...' : 'Create Chatbot'}
//                     </Button>
//                 </form>

//                 {error && <p className="text-red-500 mt-2">{error}</p>}

//                 <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
//             </div>
//         </div>
//     );
// }

// export default CreateChatbot;




// 'use client';


// import Avatar from '@/components/Avatar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { CREATE_CHATBOT } from '@/graphql/mutations/mutations';
// import { useMutation } from '@apollo/client';
// import { useUser } from '@clerk/nextjs';
// import { useRouter } from 'next/navigation';
// import React, { FormEvent, useState, useEffect } from 'react';

// function CreateChatbot() {
//     const { user } = useUser();
//     const [name, setName] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter(); // Call useRouter inside the component body
// const [isClient, setIsClient] = useState(false);

// useEffect(() => {
//     setIsClient(true);
// }, []);

//     const [createChatbot, { data, loading }] = useMutation(CREATE_CHATBOT, {
//         variables: {
//             clerk_user_id: user?.id,
//             name,
//         },
//     });

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const data = await createChatbot();
//             setName('');
//         router.push(`/edit-chatbot/${data.data.insertChatbots.id}`);

//         } catch (err) {
//             console.error('Error creating chatbot:', err);
//             setError('Failed to create chatbot. Please try again!.');
//         }
//     };

// if (!isClient) {
//     return null; // or a loading spinner if preferred
// }

//     return (
//         <div className="flex flex-col items-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
//             <Avatar seed="create-chatbot" />
//             <div>
//                 <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
//                 <h2 className="font-light">
//                     Create a new chatbot to assist you in your conversations with your customers
//                 </h2>

//                 <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mt-5">
//                     <Input
//                         placeholder="Chatbot Name..."
//                         className="max-w-lg"
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" disabled={loading || !name}>
//                         {loading ? 'Creating...' : 'Create Chatbot'}
//                     </Button>
//                 </form>

//                 {error && <p className="text-red-500 mt-2">{error}</p>}

//                 <p className="text-gray-300 mt-5">Example: Customer Support Chatbot</p>
//             </div>
//         </div>
//     );
// }

// export default CreateChatbot;



// 'use client'

// import Avatar from '@/components/Avatar'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { CREATE_CHATBOT } from '@/graphql/mutations/mutations'
// import { useMutation } from '@apollo/client'
// import { useUser } from '@clerk/nextjs'
// import { useRouter } from 'next/navigation'
// import React, { FormEvent, useState } from 'react'

// function CreateChatbot() {
//     const { user } = useUser();
//     const [name, setName] = useState("");

//     const router = useRouter();

//     const [createChatbot, { data, loading, error }] = useMutation(
//         CREATE_CHATBOT, {
//         variables: {
//             clerk_user_id: user?.id,
//             name,
//         },
//     });

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();

//         try {
//             const data = await createChatbot();
//             setName("");

//             router.push(`/edit-chatbot/${data.data.inserChatbot.id}`)
//         } catch (error) {
//             console.error('Error creating chatbot:', error);
// Handle error here
//         }
//     }

//     return (
//         <div className='flex flex-col items-center md:flex-row
//         md:space-x-10 bg-white p-10 rounded-md m-10'>
//             <Avatar seed="create-chatbot" />
//             <div>
//                 <h1 className='text-xl lg:text-3xl font-semibold'>Create</h1>
//                 <h2 className='font-light'>
//                     Create a new chatbot to assist you in your conversations with your customers
//                 </h2>

//                 <form onSubmit={handleSubmit}
//                     className='flex flex-col md:flex-row gap-2 mt-5'>
//                     <Input placeholder='Chatbot Name...'
//                         className='max-w-lg'
//                         type='text'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required />
//                     <Button>Create Chatbot</Button>
//                 </form>

//                 <p className='text-gray-300 mt-5'>Example: Customer Support Chatbot</p>
//             </div>
//         </div>
//     )
// }

// export default CreateChatbot;
