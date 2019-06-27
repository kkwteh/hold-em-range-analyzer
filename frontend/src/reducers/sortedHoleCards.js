const sortedHoleCards = [
  ["3s", "2d"],
  ["3s", "2h"],
  ["3d", "2h"],
  ["3s", "2c"],
  ["3d", "2c"],
  ["3h", "2c"],
  ["3d", "2s"],
  ["3h", "2s"],
  ["3h", "2d"],
  ["3c", "2s"],
  ["3c", "2d"],
  ["3c", "2h"],
  ["7s", "2d"],
  ["7s", "2h"],
  ["7d", "2h"],
  ["7s", "2c"],
  ["7d", "2c"],
  ["7h", "2c"],
  ["7d", "2s"],
  ["7h", "2s"],
  ["7h", "2d"],
  ["7c", "2s"],
  ["7c", "2d"],
  ["7c", "2h"],
  ["4s", "2d"],
  ["4s", "2h"],
  ["4d", "2h"],
  ["4s", "2c"],
  ["4d", "2c"],
  ["4h", "2c"],
  ["4d", "2s"],
  ["4h", "2s"],
  ["4h", "2d"],
  ["4c", "2s"],
  ["4c", "2d"],
  ["4c", "2h"],
  ["5s", "2d"],
  ["5s", "2h"],
  ["5d", "2h"],
  ["5s", "2c"],
  ["5d", "2c"],
  ["5h", "2c"],
  ["5d", "2s"],
  ["5h", "2s"],
  ["5h", "2d"],
  ["5c", "2s"],
  ["5c", "2d"],
  ["5c", "2h"],
  ["6s", "2d"],
  ["6s", "2h"],
  ["6d", "2h"],
  ["6s", "2c"],
  ["6d", "2c"],
  ["6h", "2c"],
  ["6d", "2s"],
  ["6h", "2s"],
  ["6h", "2d"],
  ["6c", "2s"],
  ["6c", "2d"],
  ["6c", "2h"],
  ["7s", "3d"],
  ["7s", "3h"],
  ["7d", "3h"],
  ["7s", "3c"],
  ["7d", "3c"],
  ["7h", "3c"],
  ["7d", "3s"],
  ["7h", "3s"],
  ["7h", "3d"],
  ["7c", "3s"],
  ["7c", "3d"],
  ["7c", "3h"],
  ["8s", "2d"],
  ["8s", "2h"],
  ["8d", "2h"],
  ["8s", "2c"],
  ["8d", "2c"],
  ["8h", "2c"],
  ["8d", "2s"],
  ["8h", "2s"],
  ["8h", "2d"],
  ["8c", "2s"],
  ["8c", "2d"],
  ["8c", "2h"],
  ["8s", "3d"],
  ["8s", "3h"],
  ["8d", "3h"],
  ["8s", "3c"],
  ["8d", "3c"],
  ["8h", "3c"],
  ["8d", "3s"],
  ["8h", "3s"],
  ["8h", "3d"],
  ["8c", "3s"],
  ["8c", "3d"],
  ["8c", "3h"],
  ["9s", "2d"],
  ["9s", "2h"],
  ["9d", "2h"],
  ["9s", "2c"],
  ["9d", "2c"],
  ["9h", "2c"],
  ["9d", "2s"],
  ["9h", "2s"],
  ["9h", "2d"],
  ["9c", "2s"],
  ["9c", "2d"],
  ["9c", "2h"],
  ["9s", "3d"],
  ["9s", "3h"],
  ["9d", "3h"],
  ["9s", "3c"],
  ["9d", "3c"],
  ["9h", "3c"],
  ["9d", "3s"],
  ["9h", "3s"],
  ["9h", "3d"],
  ["9c", "3s"],
  ["9c", "3d"],
  ["9c", "3h"],
  ["4s", "3d"],
  ["4s", "3h"],
  ["4d", "3h"],
  ["4s", "3c"],
  ["4d", "3c"],
  ["4h", "3c"],
  ["4d", "3s"],
  ["4h", "3s"],
  ["4h", "3d"],
  ["4c", "3s"],
  ["4c", "3d"],
  ["4c", "3h"],
  ["6s", "3d"],
  ["6s", "3h"],
  ["6d", "3h"],
  ["6s", "3c"],
  ["6d", "3c"],
  ["6h", "3c"],
  ["6d", "3s"],
  ["6h", "3s"],
  ["6h", "3d"],
  ["6c", "3s"],
  ["6c", "3d"],
  ["6c", "3h"],
  ["8s", "4d"],
  ["8s", "4h"],
  ["8d", "4h"],
  ["8s", "4c"],
  ["8d", "4c"],
  ["8h", "4c"],
  ["8d", "4s"],
  ["8h", "4s"],
  ["8h", "4d"],
  ["8c", "4s"],
  ["8c", "4d"],
  ["8c", "4h"],
  ["9s", "4d"],
  ["9s", "4h"],
  ["9d", "4h"],
  ["9s", "4c"],
  ["9d", "4c"],
  ["9h", "4c"],
  ["9d", "4s"],
  ["9h", "4s"],
  ["9h", "4d"],
  ["9c", "4s"],
  ["9c", "4d"],
  ["9c", "4h"],
  ["Ts", "2d"],
  ["Ts", "2h"],
  ["Td", "2h"],
  ["Ts", "2c"],
  ["Td", "2c"],
  ["Th", "2c"],
  ["Td", "2s"],
  ["Th", "2s"],
  ["Th", "2d"],
  ["Tc", "2s"],
  ["Tc", "2d"],
  ["Tc", "2h"],
  ["Ts", "3d"],
  ["Ts", "3h"],
  ["Td", "3h"],
  ["Ts", "3c"],
  ["Td", "3c"],
  ["Th", "3c"],
  ["Td", "3s"],
  ["Th", "3s"],
  ["Th", "3d"],
  ["Tc", "3s"],
  ["Tc", "3d"],
  ["Tc", "3h"],
  ["5s", "3d"],
  ["5s", "3h"],
  ["5d", "3h"],
  ["5s", "3c"],
  ["5d", "3c"],
  ["5h", "3c"],
  ["5d", "3s"],
  ["5h", "3s"],
  ["5h", "3d"],
  ["5c", "3s"],
  ["5c", "3d"],
  ["5c", "3h"],
  ["6s", "4d"],
  ["6s", "4h"],
  ["6d", "4h"],
  ["6s", "4c"],
  ["6d", "4c"],
  ["6h", "4c"],
  ["6d", "4s"],
  ["6h", "4s"],
  ["6h", "4d"],
  ["6c", "4s"],
  ["6c", "4d"],
  ["6c", "4h"],
  ["7s", "4d"],
  ["7s", "4h"],
  ["7d", "4h"],
  ["7s", "4c"],
  ["7d", "4c"],
  ["7h", "4c"],
  ["7d", "4s"],
  ["7h", "4s"],
  ["7h", "4d"],
  ["7c", "4s"],
  ["7c", "4d"],
  ["7c", "4h"],
  ["9s", "5d"],
  ["9s", "5h"],
  ["9d", "5h"],
  ["9s", "5c"],
  ["9d", "5c"],
  ["9h", "5c"],
  ["9d", "5s"],
  ["9h", "5s"],
  ["9h", "5d"],
  ["9c", "5s"],
  ["9c", "5d"],
  ["9c", "5h"],
  ["Ts", "4d"],
  ["Ts", "4h"],
  ["Td", "4h"],
  ["Ts", "4c"],
  ["Td", "4c"],
  ["Th", "4c"],
  ["Td", "4s"],
  ["Th", "4s"],
  ["Th", "4d"],
  ["Tc", "4s"],
  ["Tc", "4d"],
  ["Tc", "4h"],
  ["Ts", "5d"],
  ["Ts", "5h"],
  ["Td", "5h"],
  ["Ts", "5c"],
  ["Td", "5c"],
  ["Th", "5c"],
  ["Td", "5s"],
  ["Th", "5s"],
  ["Th", "5d"],
  ["Tc", "5s"],
  ["Tc", "5d"],
  ["Tc", "5h"],
  ["Js", "2d"],
  ["Js", "2h"],
  ["Jd", "2h"],
  ["Js", "2c"],
  ["Jd", "2c"],
  ["Jh", "2c"],
  ["Jd", "2s"],
  ["Jh", "2s"],
  ["Jh", "2d"],
  ["Jc", "2s"],
  ["Jc", "2d"],
  ["Jc", "2h"],
  ["Js", "3d"],
  ["Js", "3h"],
  ["Jd", "3h"],
  ["Js", "3c"],
  ["Jd", "3c"],
  ["Jh", "3c"],
  ["Jd", "3s"],
  ["Jh", "3s"],
  ["Jh", "3d"],
  ["Jc", "3s"],
  ["Jc", "3d"],
  ["Jc", "3h"],
  ["5s", "4d"],
  ["5s", "4h"],
  ["5d", "4h"],
  ["5s", "4c"],
  ["5d", "4c"],
  ["5h", "4c"],
  ["5d", "4s"],
  ["5h", "4s"],
  ["5h", "4d"],
  ["5c", "4s"],
  ["5c", "4d"],
  ["5c", "4h"],
  ["7s", "5d"],
  ["7s", "5h"],
  ["7d", "5h"],
  ["7s", "5c"],
  ["7d", "5c"],
  ["7h", "5c"],
  ["7d", "5s"],
  ["7h", "5s"],
  ["7h", "5d"],
  ["7c", "5s"],
  ["7c", "5d"],
  ["7c", "5h"],
  ["8s", "5d"],
  ["8s", "5h"],
  ["8d", "5h"],
  ["8s", "5c"],
  ["8d", "5c"],
  ["8h", "5c"],
  ["8d", "5s"],
  ["8h", "5s"],
  ["8h", "5d"],
  ["8c", "5s"],
  ["8c", "5d"],
  ["8c", "5h"],
  ["Js", "4d"],
  ["Js", "4h"],
  ["Jd", "4h"],
  ["Js", "4c"],
  ["Jd", "4c"],
  ["Jh", "4c"],
  ["Jd", "4s"],
  ["Jh", "4s"],
  ["Jh", "4d"],
  ["Jc", "4s"],
  ["Jc", "4d"],
  ["Jc", "4h"],
  ["Js", "5d"],
  ["Js", "5h"],
  ["Jd", "5h"],
  ["Js", "5c"],
  ["Jd", "5c"],
  ["Jh", "5c"],
  ["Jd", "5s"],
  ["Jh", "5s"],
  ["Jh", "5d"],
  ["Jc", "5s"],
  ["Jc", "5d"],
  ["Jc", "5h"],
  ["Qs", "2d"],
  ["Qs", "2h"],
  ["Qd", "2h"],
  ["Qs", "2c"],
  ["Qd", "2c"],
  ["Qh", "2c"],
  ["Qd", "2s"],
  ["Qh", "2s"],
  ["Qh", "2d"],
  ["Qc", "2s"],
  ["Qc", "2d"],
  ["Qc", "2h"],
  ["Qs", "3d"],
  ["Qs", "3h"],
  ["Qd", "3h"],
  ["Qs", "3c"],
  ["Qd", "3c"],
  ["Qh", "3c"],
  ["Qd", "3s"],
  ["Qh", "3s"],
  ["Qh", "3d"],
  ["Qc", "3s"],
  ["Qc", "3d"],
  ["Qc", "3h"],
  ["3s", "2s"],
  ["3d", "2d"],
  ["3h", "2h"],
  ["3c", "2c"],
  ["7s", "2s"],
  ["7d", "2d"],
  ["7h", "2h"],
  ["7c", "2c"],
  ["6s", "5d"],
  ["6s", "5h"],
  ["6d", "5h"],
  ["6s", "5c"],
  ["6d", "5c"],
  ["6h", "5c"],
  ["6d", "5s"],
  ["6h", "5s"],
  ["6h", "5d"],
  ["6c", "5s"],
  ["6c", "5d"],
  ["6c", "5h"],
  ["7s", "6d"],
  ["7s", "6h"],
  ["7d", "6h"],
  ["7s", "6c"],
  ["7d", "6c"],
  ["7h", "6c"],
  ["7d", "6s"],
  ["7h", "6s"],
  ["7h", "6d"],
  ["7c", "6s"],
  ["7c", "6d"],
  ["7c", "6h"],
  ["8s", "6d"],
  ["8s", "6h"],
  ["8d", "6h"],
  ["8s", "6c"],
  ["8d", "6c"],
  ["8h", "6c"],
  ["8d", "6s"],
  ["8h", "6s"],
  ["8h", "6d"],
  ["8c", "6s"],
  ["8c", "6d"],
  ["8c", "6h"],
  ["9s", "6d"],
  ["9s", "6h"],
  ["9d", "6h"],
  ["9s", "6c"],
  ["9d", "6c"],
  ["9h", "6c"],
  ["9d", "6s"],
  ["9h", "6s"],
  ["9h", "6d"],
  ["9c", "6s"],
  ["9c", "6d"],
  ["9c", "6h"],
  ["Ts", "6d"],
  ["Ts", "6h"],
  ["Td", "6h"],
  ["Ts", "6c"],
  ["Td", "6c"],
  ["Th", "6c"],
  ["Td", "6s"],
  ["Th", "6s"],
  ["Th", "6d"],
  ["Tc", "6s"],
  ["Tc", "6d"],
  ["Tc", "6h"],
  ["Js", "6d"],
  ["Js", "6h"],
  ["Jd", "6h"],
  ["Js", "6c"],
  ["Jd", "6c"],
  ["Jh", "6c"],
  ["Jd", "6s"],
  ["Jh", "6s"],
  ["Jh", "6d"],
  ["Jc", "6s"],
  ["Jc", "6d"],
  ["Jc", "6h"],
  ["Qs", "4d"],
  ["Qs", "4h"],
  ["Qd", "4h"],
  ["Qs", "4c"],
  ["Qd", "4c"],
  ["Qh", "4c"],
  ["Qd", "4s"],
  ["Qh", "4s"],
  ["Qh", "4d"],
  ["Qc", "4s"],
  ["Qc", "4d"],
  ["Qc", "4h"],
  ["Qs", "5d"],
  ["Qs", "5h"],
  ["Qd", "5h"],
  ["Qs", "5c"],
  ["Qd", "5c"],
  ["Qh", "5c"],
  ["Qd", "5s"],
  ["Qh", "5s"],
  ["Qh", "5d"],
  ["Qc", "5s"],
  ["Qc", "5d"],
  ["Qc", "5h"],
  ["Ks", "2d"],
  ["Ks", "2h"],
  ["Kd", "2h"],
  ["Ks", "2c"],
  ["Kd", "2c"],
  ["Kh", "2c"],
  ["Kd", "2s"],
  ["Kh", "2s"],
  ["Kh", "2d"],
  ["Kc", "2s"],
  ["Kc", "2d"],
  ["Kc", "2h"],
  ["4s", "2s"],
  ["4d", "2d"],
  ["4h", "2h"],
  ["4c", "2c"],
  ["5s", "2s"],
  ["5d", "2d"],
  ["5h", "2h"],
  ["5c", "2c"],
  ["6s", "2s"],
  ["6d", "2d"],
  ["6h", "2h"],
  ["6c", "2c"],
  ["7s", "3s"],
  ["7d", "3d"],
  ["7h", "3h"],
  ["7c", "3c"],
  ["8s", "2s"],
  ["8d", "2d"],
  ["8h", "2h"],
  ["8c", "2c"],
  ["8s", "3s"],
  ["8d", "3d"],
  ["8h", "3h"],
  ["8c", "3c"],
  ["9s", "2s"],
  ["9d", "2d"],
  ["9h", "2h"],
  ["9c", "2c"],
  ["9s", "7d"],
  ["9s", "7h"],
  ["9d", "7h"],
  ["9s", "7c"],
  ["9d", "7c"],
  ["9h", "7c"],
  ["9d", "7s"],
  ["9h", "7s"],
  ["9h", "7d"],
  ["9c", "7s"],
  ["9c", "7d"],
  ["9c", "7h"],
  ["Ts", "7d"],
  ["Ts", "7h"],
  ["Td", "7h"],
  ["Ts", "7c"],
  ["Td", "7c"],
  ["Th", "7c"],
  ["Td", "7s"],
  ["Th", "7s"],
  ["Th", "7d"],
  ["Tc", "7s"],
  ["Tc", "7d"],
  ["Tc", "7h"],
  ["Js", "7d"],
  ["Js", "7h"],
  ["Jd", "7h"],
  ["Js", "7c"],
  ["Jd", "7c"],
  ["Jh", "7c"],
  ["Jd", "7s"],
  ["Jh", "7s"],
  ["Jh", "7d"],
  ["Jc", "7s"],
  ["Jc", "7d"],
  ["Jc", "7h"],
  ["Qs", "6d"],
  ["Qs", "6h"],
  ["Qd", "6h"],
  ["Qs", "6c"],
  ["Qd", "6c"],
  ["Qh", "6c"],
  ["Qd", "6s"],
  ["Qh", "6s"],
  ["Qh", "6d"],
  ["Qc", "6s"],
  ["Qc", "6d"],
  ["Qc", "6h"],
  ["Qs", "7d"],
  ["Qs", "7h"],
  ["Qd", "7h"],
  ["Qs", "7c"],
  ["Qd", "7c"],
  ["Qh", "7c"],
  ["Qd", "7s"],
  ["Qh", "7s"],
  ["Qh", "7d"],
  ["Qc", "7s"],
  ["Qc", "7d"],
  ["Qc", "7h"],
  ["Ks", "3d"],
  ["Ks", "3h"],
  ["Kd", "3h"],
  ["Ks", "3c"],
  ["Kd", "3c"],
  ["Kh", "3c"],
  ["Kd", "3s"],
  ["Kh", "3s"],
  ["Kh", "3d"],
  ["Kc", "3s"],
  ["Kc", "3d"],
  ["Kc", "3h"],
  ["Ks", "4d"],
  ["Ks", "4h"],
  ["Kd", "4h"],
  ["Ks", "4c"],
  ["Kd", "4c"],
  ["Kh", "4c"],
  ["Kd", "4s"],
  ["Kh", "4s"],
  ["Kh", "4d"],
  ["Kc", "4s"],
  ["Kc", "4d"],
  ["Kc", "4h"],
  ["4s", "3s"],
  ["4d", "3d"],
  ["4h", "3h"],
  ["4c", "3c"],
  ["6s", "3s"],
  ["6d", "3d"],
  ["6h", "3h"],
  ["6c", "3c"],
  ["8s", "4s"],
  ["8d", "4d"],
  ["8h", "4h"],
  ["8c", "4c"],
  ["9s", "3s"],
  ["9d", "3d"],
  ["9h", "3h"],
  ["9c", "3c"],
  ["9s", "4s"],
  ["9d", "4d"],
  ["9h", "4h"],
  ["9c", "4c"],
  ["Ts", "2s"],
  ["Td", "2d"],
  ["Th", "2h"],
  ["Tc", "2c"],
  ["8s", "7d"],
  ["8s", "7h"],
  ["8d", "7h"],
  ["8s", "7c"],
  ["8d", "7c"],
  ["8h", "7c"],
  ["8d", "7s"],
  ["8h", "7s"],
  ["8h", "7d"],
  ["8c", "7s"],
  ["8c", "7d"],
  ["8c", "7h"],
  ["Ks", "5d"],
  ["Ks", "5h"],
  ["Kd", "5h"],
  ["Ks", "5c"],
  ["Kd", "5c"],
  ["Kh", "5c"],
  ["Kd", "5s"],
  ["Kh", "5s"],
  ["Kh", "5d"],
  ["Kc", "5s"],
  ["Kc", "5d"],
  ["Kc", "5h"],
  ["Ks", "6d"],
  ["Ks", "6h"],
  ["Kd", "6h"],
  ["Ks", "6c"],
  ["Kd", "6c"],
  ["Kh", "6c"],
  ["Kd", "6s"],
  ["Kh", "6s"],
  ["Kh", "6d"],
  ["Kc", "6s"],
  ["Kc", "6d"],
  ["Kc", "6h"],
  ["5s", "3s"],
  ["5d", "3d"],
  ["5h", "3h"],
  ["5c", "3c"],
  ["6s", "4s"],
  ["6d", "4d"],
  ["6h", "4h"],
  ["6c", "4c"],
  ["7s", "4s"],
  ["7d", "4d"],
  ["7h", "4h"],
  ["7c", "4c"],
  ["9s", "5s"],
  ["9d", "5d"],
  ["9h", "5h"],
  ["9c", "5c"],
  ["Ts", "3s"],
  ["Td", "3d"],
  ["Th", "3h"],
  ["Tc", "3c"],
  ["Ts", "4s"],
  ["Td", "4d"],
  ["Th", "4h"],
  ["Tc", "4c"],
  ["Ts", "5s"],
  ["Td", "5d"],
  ["Th", "5h"],
  ["Tc", "5c"],
  ["Js", "2s"],
  ["Jd", "2d"],
  ["Jh", "2h"],
  ["Jc", "2c"],
  ["Js", "3s"],
  ["Jd", "3d"],
  ["Jh", "3h"],
  ["Jc", "3c"],
  ["2d", "2s"],
  ["2h", "2s"],
  ["2h", "2d"],
  ["2c", "2s"],
  ["2c", "2d"],
  ["2c", "2h"],
  ["9s", "8d"],
  ["9s", "8h"],
  ["9d", "8h"],
  ["9s", "8c"],
  ["9d", "8c"],
  ["9h", "8c"],
  ["9d", "8s"],
  ["9h", "8s"],
  ["9h", "8d"],
  ["9c", "8s"],
  ["9c", "8d"],
  ["9c", "8h"],
  ["Ts", "8d"],
  ["Ts", "8h"],
  ["Td", "8h"],
  ["Ts", "8c"],
  ["Td", "8c"],
  ["Th", "8c"],
  ["Td", "8s"],
  ["Th", "8s"],
  ["Th", "8d"],
  ["Tc", "8s"],
  ["Tc", "8d"],
  ["Tc", "8h"],
  ["Js", "8d"],
  ["Js", "8h"],
  ["Jd", "8h"],
  ["Js", "8c"],
  ["Jd", "8c"],
  ["Jh", "8c"],
  ["Jd", "8s"],
  ["Jh", "8s"],
  ["Jh", "8d"],
  ["Jc", "8s"],
  ["Jc", "8d"],
  ["Jc", "8h"],
  ["Qs", "8d"],
  ["Qs", "8h"],
  ["Qd", "8h"],
  ["Qs", "8c"],
  ["Qd", "8c"],
  ["Qh", "8c"],
  ["Qd", "8s"],
  ["Qh", "8s"],
  ["Qh", "8d"],
  ["Qc", "8s"],
  ["Qc", "8d"],
  ["Qc", "8h"],
  ["Ks", "7d"],
  ["Ks", "7h"],
  ["Kd", "7h"],
  ["Ks", "7c"],
  ["Kd", "7c"],
  ["Kh", "7c"],
  ["Kd", "7s"],
  ["Kh", "7s"],
  ["Kh", "7d"],
  ["Kc", "7s"],
  ["Kc", "7d"],
  ["Kc", "7h"],
  ["As", "2d"],
  ["As", "2h"],
  ["Ad", "2h"],
  ["As", "2c"],
  ["Ad", "2c"],
  ["Ah", "2c"],
  ["Ad", "2s"],
  ["Ah", "2s"],
  ["Ah", "2d"],
  ["Ac", "2s"],
  ["Ac", "2d"],
  ["Ac", "2h"],
  ["As", "3d"],
  ["As", "3h"],
  ["Ad", "3h"],
  ["As", "3c"],
  ["Ad", "3c"],
  ["Ah", "3c"],
  ["Ad", "3s"],
  ["Ah", "3s"],
  ["Ah", "3d"],
  ["Ac", "3s"],
  ["Ac", "3d"],
  ["Ac", "3h"],
  ["7s", "5s"],
  ["7d", "5d"],
  ["7h", "5h"],
  ["7c", "5c"],
  ["8s", "5s"],
  ["8d", "5d"],
  ["8h", "5h"],
  ["8c", "5c"],
  ["Js", "4s"],
  ["Jd", "4d"],
  ["Jh", "4h"],
  ["Jc", "4c"],
  ["Js", "5s"],
  ["Jd", "5d"],
  ["Jh", "5h"],
  ["Jc", "5c"],
  ["Qs", "2s"],
  ["Qd", "2d"],
  ["Qh", "2h"],
  ["Qc", "2c"],
  ["Qs", "3s"],
  ["Qd", "3d"],
  ["Qh", "3h"],
  ["Qc", "3c"],
  ["3d", "3s"],
  ["3h", "3s"],
  ["3h", "3d"],
  ["3c", "3s"],
  ["3c", "3d"],
  ["3c", "3h"],
  ["Ks", "8d"],
  ["Ks", "8h"],
  ["Kd", "8h"],
  ["Ks", "8c"],
  ["Kd", "8c"],
  ["Kh", "8c"],
  ["Kd", "8s"],
  ["Kh", "8s"],
  ["Kh", "8d"],
  ["Kc", "8s"],
  ["Kc", "8d"],
  ["Kc", "8h"],
  ["As", "4d"],
  ["As", "4h"],
  ["Ad", "4h"],
  ["As", "4c"],
  ["Ad", "4c"],
  ["Ah", "4c"],
  ["Ad", "4s"],
  ["Ah", "4s"],
  ["Ah", "4d"],
  ["Ac", "4s"],
  ["Ac", "4d"],
  ["Ac", "4h"],
  ["As", "5d"],
  ["As", "5h"],
  ["Ad", "5h"],
  ["As", "5c"],
  ["Ad", "5c"],
  ["Ah", "5c"],
  ["Ad", "5s"],
  ["Ah", "5s"],
  ["Ah", "5d"],
  ["Ac", "5s"],
  ["Ac", "5d"],
  ["Ac", "5h"],
  ["As", "6d"],
  ["As", "6h"],
  ["Ad", "6h"],
  ["As", "6c"],
  ["Ad", "6c"],
  ["Ah", "6c"],
  ["Ad", "6s"],
  ["Ah", "6s"],
  ["Ah", "6d"],
  ["Ac", "6s"],
  ["Ac", "6d"],
  ["Ac", "6h"],
  ["8s", "6s"],
  ["8d", "6d"],
  ["8h", "6h"],
  ["8c", "6c"],
  ["9s", "6s"],
  ["9d", "6d"],
  ["9h", "6h"],
  ["9c", "6c"],
  ["Ts", "6s"],
  ["Td", "6d"],
  ["Th", "6h"],
  ["Tc", "6c"],
  ["Js", "6s"],
  ["Jd", "6d"],
  ["Jh", "6h"],
  ["Jc", "6c"],
  ["Qs", "4s"],
  ["Qd", "4d"],
  ["Qh", "4h"],
  ["Qc", "4c"],
  ["Qs", "5s"],
  ["Qd", "5d"],
  ["Qh", "5h"],
  ["Qc", "5c"],
  ["Ks", "2s"],
  ["Kd", "2d"],
  ["Kh", "2h"],
  ["Kc", "2c"],
  ["4d", "4s"],
  ["4h", "4s"],
  ["4h", "4d"],
  ["4c", "4s"],
  ["4c", "4d"],
  ["4c", "4h"],
  ["Ts", "9d"],
  ["Ts", "9h"],
  ["Td", "9h"],
  ["Ts", "9c"],
  ["Td", "9c"],
  ["Th", "9c"],
  ["Td", "9s"],
  ["Th", "9s"],
  ["Th", "9d"],
  ["Tc", "9s"],
  ["Tc", "9d"],
  ["Tc", "9h"],
  ["Js", "9d"],
  ["Js", "9h"],
  ["Jd", "9h"],
  ["Js", "9c"],
  ["Jd", "9c"],
  ["Jh", "9c"],
  ["Jd", "9s"],
  ["Jh", "9s"],
  ["Jh", "9d"],
  ["Jc", "9s"],
  ["Jc", "9d"],
  ["Jc", "9h"],
  ["Qs", "9d"],
  ["Qs", "9h"],
  ["Qd", "9h"],
  ["Qs", "9c"],
  ["Qd", "9c"],
  ["Qh", "9c"],
  ["Qd", "9s"],
  ["Qh", "9s"],
  ["Qh", "9d"],
  ["Qc", "9s"],
  ["Qc", "9d"],
  ["Qc", "9h"],
  ["As", "7d"],
  ["As", "7h"],
  ["Ad", "7h"],
  ["As", "7c"],
  ["Ad", "7c"],
  ["Ah", "7c"],
  ["Ad", "7s"],
  ["Ah", "7s"],
  ["Ah", "7d"],
  ["Ac", "7s"],
  ["Ac", "7d"],
  ["Ac", "7h"],
  ["As", "8d"],
  ["As", "8h"],
  ["Ad", "8h"],
  ["As", "8c"],
  ["Ad", "8c"],
  ["Ah", "8c"],
  ["Ad", "8s"],
  ["Ah", "8s"],
  ["Ah", "8d"],
  ["Ac", "8s"],
  ["Ac", "8d"],
  ["Ac", "8h"],
  ["9s", "7s"],
  ["9d", "7d"],
  ["9h", "7h"],
  ["9c", "7c"],
  ["Ts", "7s"],
  ["Td", "7d"],
  ["Th", "7h"],
  ["Tc", "7c"],
  ["Js", "7s"],
  ["Jd", "7d"],
  ["Jh", "7h"],
  ["Jc", "7c"],
  ["Qs", "6s"],
  ["Qd", "6d"],
  ["Qh", "6h"],
  ["Qc", "6c"],
  ["Qs", "7s"],
  ["Qd", "7d"],
  ["Qh", "7h"],
  ["Qc", "7c"],
  ["Ks", "3s"],
  ["Kd", "3d"],
  ["Kh", "3h"],
  ["Kc", "3c"],
  ["Ks", "4s"],
  ["Kd", "4d"],
  ["Kh", "4h"],
  ["Kc", "4c"],
  ["5d", "5s"],
  ["5h", "5s"],
  ["5h", "5d"],
  ["5c", "5s"],
  ["5c", "5d"],
  ["5c", "5h"],
  ["Ks", "9d"],
  ["Ks", "9h"],
  ["Kd", "9h"],
  ["Ks", "9c"],
  ["Kd", "9c"],
  ["Kh", "9c"],
  ["Kd", "9s"],
  ["Kh", "9s"],
  ["Kh", "9d"],
  ["Kc", "9s"],
  ["Kc", "9d"],
  ["Kc", "9h"],
  ["As", "9d"],
  ["As", "9h"],
  ["Ad", "9h"],
  ["As", "9c"],
  ["Ad", "9c"],
  ["Ah", "9c"],
  ["Ad", "9s"],
  ["Ah", "9s"],
  ["Ah", "9d"],
  ["Ac", "9s"],
  ["Ac", "9d"],
  ["Ac", "9h"],
  ["Ks", "5s"],
  ["Kd", "5d"],
  ["Kh", "5h"],
  ["Kc", "5c"],
  ["Ks", "6s"],
  ["Kd", "6d"],
  ["Kh", "6h"],
  ["Kc", "6c"],
  ["6d", "6s"],
  ["6h", "6s"],
  ["6h", "6d"],
  ["6c", "6s"],
  ["6c", "6d"],
  ["6c", "6h"],
  ["Ts", "8s"],
  ["Td", "8d"],
  ["Th", "8h"],
  ["Tc", "8c"],
  ["Js", "8s"],
  ["Jd", "8d"],
  ["Jh", "8h"],
  ["Jc", "8c"],
  ["Qs", "8s"],
  ["Qd", "8d"],
  ["Qh", "8h"],
  ["Qc", "8c"],
  ["Ks", "7s"],
  ["Kd", "7d"],
  ["Kh", "7h"],
  ["Kc", "7c"],
  ["As", "2s"],
  ["Ad", "2d"],
  ["Ah", "2h"],
  ["Ac", "2c"],
  ["As", "3s"],
  ["Ad", "3d"],
  ["Ah", "3h"],
  ["Ac", "3c"],
  ["Js", "Td"],
  ["Js", "Th"],
  ["Jd", "Th"],
  ["Js", "Tc"],
  ["Jd", "Tc"],
  ["Jh", "Tc"],
  ["Jd", "Ts"],
  ["Jh", "Ts"],
  ["Jh", "Td"],
  ["Jc", "Ts"],
  ["Jc", "Td"],
  ["Jc", "Th"],
  ["Qs", "Td"],
  ["Qs", "Th"],
  ["Qd", "Th"],
  ["Qs", "Tc"],
  ["Qd", "Tc"],
  ["Qh", "Tc"],
  ["Qd", "Ts"],
  ["Qh", "Ts"],
  ["Qh", "Td"],
  ["Qc", "Ts"],
  ["Qc", "Td"],
  ["Qc", "Th"],
  ["Ks", "Td"],
  ["Ks", "Th"],
  ["Kd", "Th"],
  ["Ks", "Tc"],
  ["Kd", "Tc"],
  ["Kh", "Tc"],
  ["Kd", "Ts"],
  ["Kh", "Ts"],
  ["Kh", "Td"],
  ["Kc", "Ts"],
  ["Kc", "Td"],
  ["Kc", "Th"],
  ["Ks", "8s"],
  ["Kd", "8d"],
  ["Kh", "8h"],
  ["Kc", "8c"],
  ["As", "4s"],
  ["Ad", "4d"],
  ["Ah", "4h"],
  ["Ac", "4c"],
  ["As", "5s"],
  ["Ad", "5d"],
  ["Ah", "5h"],
  ["Ac", "5c"],
  ["As", "6s"],
  ["Ad", "6d"],
  ["Ah", "6h"],
  ["Ac", "6c"],
  ["7d", "7s"],
  ["7h", "7s"],
  ["7h", "7d"],
  ["7c", "7s"],
  ["7c", "7d"],
  ["7c", "7h"],
  ["Qs", "Jd"],
  ["Qs", "Jh"],
  ["Qd", "Jh"],
  ["Qs", "Jc"],
  ["Qd", "Jc"],
  ["Qh", "Jc"],
  ["Qd", "Js"],
  ["Qh", "Js"],
  ["Qh", "Jd"],
  ["Qc", "Js"],
  ["Qc", "Jd"],
  ["Qc", "Jh"],
  ["As", "Td"],
  ["As", "Th"],
  ["Ad", "Th"],
  ["As", "Tc"],
  ["Ad", "Tc"],
  ["Ah", "Tc"],
  ["Ad", "Ts"],
  ["Ah", "Ts"],
  ["Ah", "Td"],
  ["Ac", "Ts"],
  ["Ac", "Td"],
  ["Ac", "Th"],
  ["7s", "6s"],
  ["7d", "6d"],
  ["7h", "6h"],
  ["7c", "6c"],
  ["8s", "7s"],
  ["8d", "7d"],
  ["8h", "7h"],
  ["8c", "7c"],
  ["9s", "8s"],
  ["9d", "8d"],
  ["9h", "8h"],
  ["9c", "8c"],
  ["Ts", "9s"],
  ["Td", "9d"],
  ["Th", "9h"],
  ["Tc", "9c"],
  ["Js", "9s"],
  ["Jd", "9d"],
  ["Jh", "9h"],
  ["Jc", "9c"],
  ["Qs", "9s"],
  ["Qd", "9d"],
  ["Qh", "9h"],
  ["Qc", "9c"],
  ["Ks", "9s"],
  ["Kd", "9d"],
  ["Kh", "9h"],
  ["Kc", "9c"],
  ["As", "7s"],
  ["Ad", "7d"],
  ["Ah", "7h"],
  ["Ac", "7c"],
  ["As", "8s"],
  ["Ad", "8d"],
  ["Ah", "8h"],
  ["Ac", "8c"],
  ["Ks", "Jd"],
  ["Ks", "Jh"],
  ["Kd", "Jh"],
  ["Ks", "Jc"],
  ["Kd", "Jc"],
  ["Kh", "Jc"],
  ["Kd", "Js"],
  ["Kh", "Js"],
  ["Kh", "Jd"],
  ["Kc", "Js"],
  ["Kc", "Jd"],
  ["Kc", "Jh"],
  ["As", "Jd"],
  ["As", "Jh"],
  ["Ad", "Jh"],
  ["As", "Jc"],
  ["Ad", "Jc"],
  ["Ah", "Jc"],
  ["Ad", "Js"],
  ["Ah", "Js"],
  ["Ah", "Jd"],
  ["Ac", "Js"],
  ["Ac", "Jd"],
  ["Ac", "Jh"],
  ["As", "9s"],
  ["Ad", "9d"],
  ["Ah", "9h"],
  ["Ac", "9c"],
  ["8d", "8s"],
  ["8h", "8s"],
  ["8h", "8d"],
  ["8c", "8s"],
  ["8c", "8d"],
  ["8c", "8h"],
  ["Ks", "Qd"],
  ["Ks", "Qh"],
  ["Kd", "Qh"],
  ["Ks", "Qc"],
  ["Kd", "Qc"],
  ["Kh", "Qc"],
  ["Kd", "Qs"],
  ["Kh", "Qs"],
  ["Kh", "Qd"],
  ["Kc", "Qs"],
  ["Kc", "Qd"],
  ["Kc", "Qh"],
  ["Js", "Ts"],
  ["Jd", "Td"],
  ["Jh", "Th"],
  ["Jc", "Tc"],
  ["Qs", "Ts"],
  ["Qd", "Td"],
  ["Qh", "Th"],
  ["Qc", "Tc"],
  ["As", "Qd"],
  ["As", "Qh"],
  ["Ad", "Qh"],
  ["As", "Qc"],
  ["Ad", "Qc"],
  ["Ah", "Qc"],
  ["Ad", "Qs"],
  ["Ah", "Qs"],
  ["Ah", "Qd"],
  ["Ac", "Qs"],
  ["Ac", "Qd"],
  ["Ac", "Qh"],
  ["Qs", "Js"],
  ["Qd", "Jd"],
  ["Qh", "Jh"],
  ["Qc", "Jc"],
  ["Ks", "Ts"],
  ["Kd", "Td"],
  ["Kh", "Th"],
  ["Kc", "Tc"],
  ["Ks", "Js"],
  ["Kd", "Jd"],
  ["Kh", "Jh"],
  ["Kc", "Jc"],
  ["As", "Ts"],
  ["Ad", "Td"],
  ["Ah", "Th"],
  ["Ac", "Tc"],
  ["9d", "9s"],
  ["9h", "9s"],
  ["9h", "9d"],
  ["9c", "9s"],
  ["9c", "9d"],
  ["9c", "9h"],
  ["As", "Kd"],
  ["As", "Kh"],
  ["Ad", "Kh"],
  ["As", "Kc"],
  ["Ad", "Kc"],
  ["Ah", "Kc"],
  ["Ad", "Ks"],
  ["Ah", "Ks"],
  ["Ah", "Kd"],
  ["Ac", "Ks"],
  ["Ac", "Kd"],
  ["Ac", "Kh"],
  ["Ks", "Qs"],
  ["Kd", "Qd"],
  ["Kh", "Qh"],
  ["Kc", "Qc"],
  ["As", "Js"],
  ["Ad", "Jd"],
  ["Ah", "Jh"],
  ["Ac", "Jc"],
  ["As", "Qs"],
  ["Ad", "Qd"],
  ["Ah", "Qh"],
  ["Ac", "Qc"],
  ["Td", "Ts"],
  ["Th", "Ts"],
  ["Th", "Td"],
  ["Tc", "Ts"],
  ["Tc", "Td"],
  ["Tc", "Th"],
  ["As", "Ks"],
  ["Ad", "Kd"],
  ["Ah", "Kh"],
  ["Ac", "Kc"],
  ["Jd", "Js"],
  ["Jh", "Js"],
  ["Jh", "Jd"],
  ["Jc", "Js"],
  ["Jc", "Jd"],
  ["Jc", "Jh"],
  ["Qd", "Qs"],
  ["Qh", "Qs"],
  ["Qh", "Qd"],
  ["Qc", "Qs"],
  ["Qc", "Qd"],
  ["Qc", "Qh"],
  ["5s", "4s"],
  ["5d", "4d"],
  ["5h", "4h"],
  ["5c", "4c"],
  ["6s", "5s"],
  ["6d", "5d"],
  ["6h", "5h"],
  ["6c", "5c"],
  ["Kd", "Ks"],
  ["Kh", "Ks"],
  ["Kh", "Kd"],
  ["Kc", "Ks"],
  ["Kc", "Kd"],
  ["Kc", "Kh"],
  ["Ad", "As"],
  ["Ah", "As"],
  ["Ah", "Ad"],
  ["Ac", "As"],
  ["Ac", "Ad"],
  ["Ac", "Ah"]
];

export default sortedHoleCards;
