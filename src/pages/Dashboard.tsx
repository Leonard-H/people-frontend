import React, { useEffect, useState } from "react";
import {
  usePeopleQuery,
  useBirthdayPeopleQuery,
  useMarriagePeopleQuery,
  useMePersonQuery
} from "../generated/graphql";
import CircularProgress from "@material-ui/core/CircularProgress";
import PeopleList from "../components/PeopleList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers/DatePicker";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import DateFnsUtils from "@date-io/date-fns";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import format from "date-fns/format";
import { getSiblingArray } from "./Person";

const useStyles = makeStyles({
  header: {
    marginBottom: 10,
    display: "flex",
    alignItems: "center"
  },
  datePicker: {
    display: "none"
  }
});

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const classes = useStyles();
  const { data, loading, error, called } = useMePersonQuery();
  const [nearestNeighbors, setNearestNeighbors] = useState([] as any);
  useEffect(() => {
    if (!data || !data.mePerson) return;
    setNearestNeighbors([
      {id:data.mePerson.id, name:data.mePerson.name},
      ...data.mePerson.descendants,
      ...data.mePerson.parents,
      ...getSiblingArray(data.mePerson as any).filter((s: any) => s.id !== data.mePerson.id)
    ])
  },[data]);
  const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(
    new Date()
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const handleClose = () => {
    setDatePickerOpen(false);
  };

  const {
    data: bpData,
    loading: bpLoading,
    error: bpError,
    called: bpCalled
  } = useBirthdayPeopleQuery({
    variables: {
      birthday: selectedDate ? selectedDate.toDateString() : undefined
    }
  });
  const {
    data: mpData,
    loading: mpLoading,
    error: mpError,
    called: mpCalled
  } = useMarriagePeopleQuery({
    variables: {
      marriageDate: selectedDate ? selectedDate.toDateString() : undefined
    }
  });

  if (error || bpError || mpError) {
    console.log(error);
    return <div>error</div>;
  }

  if (
    (!data && !loading && called) ||
    (!bpLoading && !bpData && bpCalled) ||
    (!mpLoading && !mpData && mpCalled)
  ) {
    return <div>no data</div>;
  }

  const isToday = selectedDate
    ? selectedDate.getDate() === new Date().getDate() &&
      selectedDate.getMonth() === new Date().getMonth()
    : false;

  const formattedDate = format(
    selectedDate ? selectedDate : new Date(),
    "dd.MM"
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container>
        <div className={classes.header}>
          <Typography color="textSecondary" variant="h4">
            {isToday
              ? "Haben Heute Geburtstag"
              : `Haben am ${formattedDate} Geburtstag`}
          </Typography>
          <IconButton onClick={() => setDatePickerOpen(true)}>
            <MoreHorizIcon />
          </IconButton>

          <KeyboardDatePicker
            showTodayButton
            todayLabel="heute"
            cancelLabel="abbrechen"
            value={selectedDate}
            className={classes.datePicker}
            onClose={handleClose}
            open={datePickerOpen}
            onChange={date => setSelectedDate(date)}
          />
        </div>

        {bpLoading ? (
          <CircularProgress />
        ) : (
          <PeopleList people={bpData ? bpData.birthdayPeople : []} />
        )}
        <Typography
          color="textSecondary"
          variant="h4"
          className={classes.header}
        >
          {isToday
            ? "Haben Heute Hochzeitstag"
            : `Haben am ${formattedDate} Hochzeitstag`}
        </Typography>

        {bpLoading ? (
          <CircularProgress />
        ) : (
          <PeopleList people={mpData ? mpData.marriagePeople : []} />
        )}

        <Typography
          color="textSecondary"
          className={classes.header}
          variant="h4"
        >
          Andere Leute
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <PeopleList people={nearestNeighbors} />
        )}
      </Container>
    </MuiPickersUtilsProvider>
  );
};
