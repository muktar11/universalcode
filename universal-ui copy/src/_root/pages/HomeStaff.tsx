import { Card, Typography } from "@material-tailwind/react";
import { useGetStaffUser } from  "@/lib/react-query/queries";
import {  IStaffUser } from "@/types";
export function HomeStaff() {
  const { isLoading, isError, data: staff } = useGetStaffUser();
  console.log('HomeStaff', staff)
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;
  
  return (
    <Card className="h-full w-full overflow-scroll bg-lightblue">
      <h2 className="h3-bold md:h2-bold text-left w-full">Staff</h2>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {["FirstName", "LastName", "Email", "Phone", "EmailField"].map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember:  IStaffUser, index: number) => {
            const isLast = index === staff.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {staffMember.first_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.last_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.email}
                  </Typography>
                </td>
              
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.phone}
                  </Typography>
                </td>

                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {staffMember.emailfield}
                  </Typography>
                </td>
              
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default HomeStaff;