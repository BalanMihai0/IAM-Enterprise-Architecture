/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react';
import { Button, Typography, Card, CardBody, Input, Textarea } from '@material-tailwind/react';
import '../style/landingPage.css'

const JobsAdminPage = () => {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
  });

  

  return (
    <div className="m-5 flex justify-center">
      <div className="w-1/2">
        <Card>
          <CardBody>
            <Typography variant="h2" className="text-2xl font-bold mb-6">Create Jobs</Typography>
            <form >
              <div className="flex flex-col space-y-4">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  name="title"
                  value={job.title}
                //   onChange={handleChange}
                  placeholder="Title"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="description">Description</label>
                <Textarea
                  name="description"
                  value={job.description}
                //   onChange={handleChange}
                  placeholder="Description"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="location">Location</label>
                <Input
                  type="text"
                  name="location"
                  value={job.location}
                //   onChange={handleChange}
                  placeholder="Location"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
                <label htmlFor="price">Price</label>
                <Input
                  type="number"
                  name="price"
                  value={job.price}
                //   onChange={handleChange}
                  placeholder="Price"
                  className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600"
                  required
                />
              </div>
              <Button type="submit" variant="gradient" color="blue" className="mt-4">Create Job</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default JobsAdminPage;
